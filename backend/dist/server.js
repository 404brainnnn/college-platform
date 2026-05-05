import "dotenv/config";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { z } from "zod";
import { prisma } from "./db.js";
const app = express();
const port = Number(process.env.PORT ?? 4000);
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({
    origin: process.env.FRONTEND_URL?.split(",") ?? "http://localhost:5173"
}));
const listQuerySchema = z.object({
    search: z.string().trim().optional(),
    location: z.string().trim().optional(),
    course: z.string().trim().optional(),
    maxFee: z.coerce.number().int().positive().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().min(1).max(24).default(8)
});
app.get("/health", (_req, res) => {
    res.json({ ok: true, service: "college-platform-api" });
});
app.get("/api/colleges", async (req, res, next) => {
    try {
        const query = listQuerySchema.parse(req.query);
        const where = {
            ...(query.search
                ? { name: { contains: query.search, mode: "insensitive" } }
                : {}),
            ...(query.location
                ? { location: { contains: query.location, mode: "insensitive" } }
                : {}),
            ...(query.course ? { courseTags: { has: query.course } } : {}),
            ...(query.maxFee ? { fee: { lte: query.maxFee } } : {})
        };
        const [items, total] = await Promise.all([
            prisma.college.findMany({
                where,
                orderBy: [{ rating: "desc" }, { placementPercent: "desc" }],
                skip: (query.page - 1) * query.limit,
                take: query.limit,
                select: {
                    id: true,
                    slug: true,
                    name: true,
                    location: true,
                    state: true,
                    fee: true,
                    rating: true,
                    placementPercent: true,
                    averagePackageLpa: true,
                    courseTags: true
                }
            }),
            prisma.college.count({ where })
        ]);
        res.json({
            items,
            pagination: {
                page: query.page,
                limit: query.limit,
                total,
                totalPages: Math.ceil(total / query.limit)
            }
        });
    }
    catch (error) {
        next(error);
    }
});
app.get("/api/colleges/meta/filters", async (_req, res, next) => {
    try {
        const colleges = await prisma.college.findMany({
            select: { location: true, courseTags: true }
        });
        res.json({
            locations: [...new Set(colleges.map((college) => college.location))].sort(),
            courses: [...new Set(colleges.flatMap((college) => college.courseTags))].sort()
        });
    }
    catch (error) {
        next(error);
    }
});
app.get("/api/colleges/:slug", async (req, res, next) => {
    try {
        const college = await prisma.college.findUnique({
            where: { slug: req.params.slug },
            include: {
                courses: { orderBy: { name: "asc" } },
                reviews: { orderBy: { rating: "desc" } }
            }
        });
        if (!college) {
            res.status(404).json({ message: "College not found" });
            return;
        }
        res.json(college);
    }
    catch (error) {
        next(error);
    }
});
app.get("/api/compare", async (req, res, next) => {
    try {
        const ids = String(req.query.ids ?? "")
            .split(",")
            .map((id) => id.trim())
            .filter(Boolean)
            .slice(0, 3);
        if (ids.length < 2) {
            res.status(400).json({ message: "Select at least two colleges to compare." });
            return;
        }
        const colleges = await prisma.college.findMany({
            where: { id: { in: ids } },
            select: {
                id: true,
                name: true,
                location: true,
                fee: true,
                placementPercent: true,
                rating: true,
                averagePackageLpa: true,
                highestPackageLpa: true
            }
        });
        res.json({ items: ids.map((id) => colleges.find((college) => college.id === id)).filter(Boolean) });
    }
    catch (error) {
        next(error);
    }
});
const predictorSchema = z.object({
    exam: z.string().trim().min(2),
    rank: z.coerce.number().int().positive()
});
app.post("/api/predictor", async (req, res, next) => {
    try {
        const input = predictorSchema.parse(req.body);
        const matches = await prisma.college.findMany({
            where: {
                exams: { has: input.exam.toUpperCase() },
                minRank: { gte: input.rank }
            },
            orderBy: [{ minRank: "asc" }, { rating: "desc" }],
            take: 8,
            select: {
                id: true,
                slug: true,
                name: true,
                location: true,
                fee: true,
                rating: true,
                placementPercent: true,
                minRank: true,
                exams: true
            }
        });
        res.json({
            items: matches,
            message: matches.length > 0
                ? "Based on your rank, these colleges are realistic options."
                : "No exact matches found. Try a higher rank range or another exam."
        });
    }
    catch (error) {
        next(error);
    }
});
app.use((error, _req, res, _next) => {
    if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid request", issues: error.flatten() });
        return;
    }
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
});
app.listen(port, () => {
    console.log(`College API listening on port ${port}`);
});
