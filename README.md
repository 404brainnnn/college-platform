# College Compass

Production-grade MVP slice for college discovery and decision-making.

## Built Features

- College listing with name search, location/course/fee filters, and pagination.
- College detail pages with overview, courses, placements, and reviews.
- Compare 2-3 selected colleges across fees, placement rate, rating, location, and packages.
- Rule-based predictor using exam and rank against DB-backed college data.

## Stack

- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript, REST APIs
- Database: PostgreSQL with Prisma ORM

## Local Setup

1. Start PostgreSQL:

```bash
docker compose up -d
```

2. Backend:

```bash
cd backend
cp .env.example .env
npm install
npm run db:generate
npm run db:migrate -- --name init
npm run db:seed
npm run dev
```

3. Frontend:

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open `http://localhost:5173`.

## Deployment

- Backend: Render can use `render.yaml`. Add `FRONTEND_URL` after deploying the frontend.
- Frontend: Deploy `frontend/` to Vercel and set `VITE_API_URL` to the deployed backend URL.
- Database seed on production: run `npm run db:seed` once from the backend shell after migrations.
