import { SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import CollegeCard from "../components/CollegeCard";
import { CollegeSummary, getColleges, getFilters } from "../lib/api";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [colleges, setColleges] = useState<CollegeSummary[]>([]);
  const [filters, setFilters] = useState({ locations: [] as string[], courses: [] as string[] });
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<CollegeSummary[]>(() => {
    const saved = localStorage.getItem("compareSelection");
    return saved ? JSON.parse(saved) : [];
  });

  const page = Number(searchParams.get("page") ?? 1);

  const query = useMemo(() => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", "6");
    return params;
  }, [searchParams]);

  useEffect(() => {
    getFilters().then(setFilters).catch(() => undefined);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    getColleges(query)
      .then((data) => {
        setColleges(data.items);
        setTotalPages(Math.max(data.pagination.totalPages, 1));
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  useEffect(() => {
    localStorage.setItem("compareSelection", JSON.stringify(selected));
  }, [selected]);

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.set("page", "1");
    setSearchParams(next);
  }

  function toggleCompare(college: CollegeSummary) {
    setSelected((current) => {
      if (current.some((item) => item.id === college.id)) {
        return current.filter((item) => item.id !== college.id);
      }
      return current.length < 3 ? [...current, college] : current;
    });
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-white p-5 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-normal text-coral">Decision-first discovery</p>
            <h1 className="mt-2 text-3xl font-bold text-ink">Find colleges that match your constraints.</h1>
          </div>
          {selected.length >= 2 ? (
            <Link
              to="/compare"
              className="flex min-h-11 items-center justify-center rounded-lg bg-moss px-4 font-semibold text-white hover:bg-moss/90"
            >
              Compare {selected.length} selected
            </Link>
          ) : null}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-4">
          <input
            className="focus-ring min-h-11 rounded-lg border border-slate-300 bg-white px-3 md:col-span-2"
            placeholder="Search college name"
            value={searchParams.get("search") ?? ""}
            onChange={(event) => updateParam("search", event.target.value)}
          />
          <select
            className="focus-ring min-h-11 rounded-lg border border-slate-300 bg-white px-3"
            value={searchParams.get("location") ?? ""}
            onChange={(event) => updateParam("location", event.target.value)}
          >
            <option value="">All locations</option>
            {filters.locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select
            className="focus-ring min-h-11 rounded-lg border border-slate-300 bg-white px-3"
            value={searchParams.get("course") ?? ""}
            onChange={(event) => updateParam("course", event.target.value)}
          >
            <option value="">All courses</option>
            {filters.courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
            <SlidersHorizontal size={17} aria-hidden="true" />
            Max fees
          </label>
          <select
            className="focus-ring min-h-10 rounded-lg border border-slate-300 bg-white px-3"
            value={searchParams.get("maxFee") ?? ""}
            onChange={(event) => updateParam("maxFee", event.target.value)}
          >
            <option value="">Any budget</option>
            <option value="700000">Under 7 lakh</option>
            <option value="1000000">Under 10 lakh</option>
            <option value="1700000">Under 17 lakh</option>
          </select>
        </div>
      </section>

      {error ? <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-80 animate-pulse rounded-lg bg-white shadow-soft" />
            ))
          : colleges.map((college) => (
              <CollegeCard
                key={college.id}
                college={college}
                selected={selected.some((item) => item.id === college.id)}
                onToggleCompare={toggleCompare}
              />
            ))}
      </section>

      {!loading && colleges.length === 0 ? (
        <p className="rounded-lg bg-white p-6 text-center text-slate-600 shadow-soft">No colleges match these filters.</p>
      ) : null}

      <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-soft">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => updateParam("page", String(page - 1))}
          className="min-h-10 rounded-lg border border-slate-300 px-4 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-sm font-medium text-slate-600">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => updateParam("page", String(page + 1))}
          className="min-h-10 rounded-lg border border-slate-300 px-4 font-semibold disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
