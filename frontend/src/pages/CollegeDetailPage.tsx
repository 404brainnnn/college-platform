import { ArrowLeft, BriefcaseBusiness, MapPin, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CollegeDetail, getCollege } from "../lib/api";
import { formatFee, formatLpa } from "../lib/format";

export default function CollegeDetailPage() {
  const { slug } = useParams();
  const [college, setCollege] = useState<CollegeDetail | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;
    getCollege(slug)
      .then(setCollege)
      .catch((err: Error) => setError(err.message));
  }, [slug]);

  if (error) {
    return <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>;
  }

  if (!college) {
    return <div className="h-96 animate-pulse rounded-lg bg-white shadow-soft" />;
  }

  return (
    <div className="space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-moss">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to colleges
      </Link>

      <section className="rounded-lg bg-white p-6 shadow-soft">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {college.courseTags.map((course) => (
                <span key={course} className="rounded-md bg-skyglass px-2 py-1 text-xs font-semibold">
                  {course}
                </span>
              ))}
            </div>
            <h1 className="mt-3 text-3xl font-bold text-ink">{college.name}</h1>
            <p className="mt-2 flex items-center gap-2 text-slate-600">
              <MapPin size={18} aria-hidden="true" />
              {college.location}, {college.state}
            </p>
            <p className="mt-5 leading-7 text-slate-700">{college.overview}</p>
          </div>
          <dl className="grid min-w-72 grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Fees</dt>
              <dd className="mt-1 font-bold">{formatFee(college.fee)}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Rating</dt>
              <dd className="mt-1 flex items-center gap-1 font-bold">
                <Star size={16} aria-hidden="true" />
                {college.rating.toFixed(1)}
              </dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Ownership</dt>
              <dd className="mt-1 font-bold">{college.ownership}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Founded</dt>
              <dd className="mt-1 font-bold">{college.established}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg bg-white p-5 shadow-soft">
          <h2 className="text-xl font-bold">Courses</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="p-3">Course</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Seats</th>
                </tr>
              </thead>
              <tbody>
                {college.courses.map((course) => (
                  <tr key={course.id} className="border-t border-slate-100">
                    <td className="p-3 font-semibold">{course.name}</td>
                    <td className="p-3">{course.duration}</td>
                    <td className="p-3">{course.seats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg bg-white p-5 shadow-soft">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <BriefcaseBusiness size={20} aria-hidden="true" />
            Placements
          </h2>
          <dl className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Placement rate</dt>
              <dd className="mt-1 text-2xl font-bold">{college.placementPercent}%</dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Avg package</dt>
              <dd className="mt-1 text-2xl font-bold">{formatLpa(college.averagePackageLpa)}</dd>
            </div>
            <div className="col-span-2 rounded-lg bg-slate-50 p-4">
              <dt className="text-sm text-slate-500">Highest package</dt>
              <dd className="mt-1 text-2xl font-bold">{formatLpa(college.highestPackageLpa)}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="rounded-lg bg-white p-5 shadow-soft">
        <h2 className="text-xl font-bold">Reviews</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {college.reviews.map((review) => (
            <article key={review.id} className="rounded-lg border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{review.author}</h3>
                <span className="text-sm font-semibold text-coral">{review.rating.toFixed(1)} / 5</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{review.comment}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
