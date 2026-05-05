import { BarChart3, IndianRupee, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import type { CollegeSummary } from "../lib/api";
import { formatFee, formatLpa } from "../lib/format";

type Props = {
  college: CollegeSummary;
  selected?: boolean;
  onToggleCompare?: (college: CollegeSummary) => void;
};

export default function CollegeCard({ college, selected = false, onToggleCompare }: Props) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-soft">
      <div className="flex flex-1 flex-col gap-4">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            {college.courseTags.slice(0, 2).map((course) => (
              <span key={course} className="rounded-md bg-skyglass px-2 py-1 text-xs font-medium text-ink">
                {course}
              </span>
            ))}
          </div>
          <Link to={`/colleges/${college.slug}`} className="text-xl font-semibold text-ink hover:text-moss">
            {college.name}
          </Link>
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={16} aria-hidden="true" />
            {college.location}, {college.state}
          </p>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div className="rounded-lg bg-slate-50 p-3">
            <dt className="flex items-center gap-1 text-slate-500">
              <IndianRupee size={14} aria-hidden="true" />
              Fees
            </dt>
            <dd className="mt-1 font-semibold">{formatFee(college.fee)}</dd>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <dt className="flex items-center gap-1 text-slate-500">
              <Star size={14} aria-hidden="true" />
              Rating
            </dt>
            <dd className="mt-1 font-semibold">{college.rating.toFixed(1)} / 5</dd>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <dt className="flex items-center gap-1 text-slate-500">
              <BarChart3 size={14} aria-hidden="true" />
              Placement
            </dt>
            <dd className="mt-1 font-semibold">{college.placementPercent}%</dd>
          </div>
          <div className="rounded-lg bg-slate-50 p-3">
            <dt className="text-slate-500">Avg package</dt>
            <dd className="mt-1 font-semibold">{formatLpa(college.averagePackageLpa)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-5 flex gap-2">
        <Link
          to={`/colleges/${college.slug}`}
          className="flex min-h-10 flex-1 items-center justify-center rounded-lg bg-ink px-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          View details
        </Link>
        {onToggleCompare ? (
          <button
            type="button"
            onClick={() => onToggleCompare(college)}
            className={`min-h-10 rounded-lg border px-3 text-sm font-semibold ${
              selected ? "border-coral bg-coral text-white" : "border-slate-300 bg-white text-ink hover:bg-slate-50"
            }`}
          >
            {selected ? "Selected" : "Compare"}
          </button>
        ) : null}
      </div>
    </article>
  );
}
