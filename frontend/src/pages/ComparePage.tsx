import { Scale } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CompareCollege, compareColleges } from "../lib/api";
import { formatFee, formatLpa } from "../lib/format";

type SavedCollege = { id: string; name: string };

export default function ComparePage() {
  const [saved, setSaved] = useState<SavedCollege[]>([]);
  const [items, setItems] = useState<CompareCollege[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const selection = JSON.parse(localStorage.getItem("compareSelection") ?? "[]") as SavedCollege[];
    setSaved(selection);
    if (selection.length >= 2) {
      compareColleges(selection.map((college) => college.id))
        .then((data) => setItems(data.items))
        .catch((err: Error) => setError(err.message));
    }
  }, []);

  function clearSelection() {
    localStorage.removeItem("compareSelection");
    setSaved([]);
    setItems([]);
  }

  if (saved.length < 2) {
    return (
      <section className="rounded-lg bg-white p-8 text-center shadow-soft">
        <Scale className="mx-auto text-moss" size={34} aria-hidden="true" />
        <h1 className="mt-3 text-2xl font-bold">Select at least two colleges</h1>
        <p className="mt-2 text-slate-600">Use the compare button on college cards to build a decision table.</p>
        <Link
          to="/"
          className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-ink px-4 font-semibold text-white hover:bg-slate-800"
        >
          Explore colleges
        </Link>
      </section>
    );
  }

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-4 rounded-lg bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-normal text-coral">Decision table</p>
          <h1 className="mt-1 text-3xl font-bold">Compare colleges side by side</h1>
        </div>
        <button
          type="button"
          onClick={clearSelection}
          className="min-h-10 rounded-lg border border-slate-300 px-4 font-semibold hover:bg-slate-50"
        >
          Clear
        </button>
      </section>

      {error ? <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p> : null}

      <section className="overflow-x-auto rounded-lg bg-white shadow-soft">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="w-48 p-4 text-sm text-slate-500">Metric</th>
              {items.map((college) => (
                <th key={college.id} className="p-4 text-base font-bold">
                  {college.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Fees", (college: CompareCollege) => formatFee(college.fee)],
              ["Placement %", (college: CompareCollege) => `${college.placementPercent}%`],
              ["Rating", (college: CompareCollege) => `${college.rating.toFixed(1)} / 5`],
              ["Location", (college: CompareCollege) => college.location],
              ["Average package", (college: CompareCollege) => formatLpa(college.averagePackageLpa)],
              ["Highest package", (college: CompareCollege) => formatLpa(college.highestPackageLpa)]
            ].map(([label, getValue]) => (
              <tr key={label as string} className="border-b border-slate-100 last:border-0">
                <th className="bg-slate-50 p-4 text-sm font-semibold text-slate-600">{label as string}</th>
                {items.map((college) => (
                  <td key={college.id} className="p-4 font-medium">
                    {(getValue as (college: CompareCollege) => string)(college)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
