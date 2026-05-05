import { BrainCircuit } from "lucide-react";
import { FormEvent, useState } from "react";
import CollegeCard from "../components/CollegeCard";
import { CollegeSummary, predictColleges } from "../lib/api";

export default function PredictorPage() {
  const [exam, setExam] = useState("JEE");
  const [rank, setRank] = useState(10000);
  const [message, setMessage] = useState("");
  const [results, setResults] = useState<CollegeSummary[]>([]);
  const [loading, setLoading] = useState(false);

  function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    predictColleges(exam, rank)
      .then((data) => {
        setResults(data.items);
        setMessage(data.message);
      })
      .catch((err: Error) => {
        setMessage(err.message);
        setResults([]);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-white p-6 shadow-soft">
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-normal text-coral">
            <BrainCircuit size={18} aria-hidden="true" />
            Rule-based predictor
          </p>
          <h1 className="mt-2 text-3xl font-bold">Estimate college options from exam rank.</h1>
        </div>
        <form onSubmit={submit} className="mt-5 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <select
            className="focus-ring min-h-11 rounded-lg border border-slate-300 bg-white px-3"
            value={exam}
            onChange={(event) => setExam(event.target.value)}
          >
            <option value="JEE">JEE</option>
            <option value="BITSAT">BITSAT</option>
            <option value="VITEEE">VITEEE</option>
            <option value="MET">MET</option>
            <option value="SRMJEEE">SRMJEEE</option>
            <option value="MHT-CET">MHT-CET</option>
          </select>
          <input
            className="focus-ring min-h-11 rounded-lg border border-slate-300 px-3"
            type="number"
            min="1"
            value={rank}
            onChange={(event) => setRank(Number(event.target.value))}
          />
          <button
            type="submit"
            className="min-h-11 rounded-lg bg-moss px-5 font-semibold text-white hover:bg-moss/90 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Checking" : "Predict"}
          </button>
        </form>
      </section>

      {message ? <p className="rounded-lg bg-white p-4 font-medium text-slate-700 shadow-soft">{message}</p> : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {results.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </section>
    </div>
  );
}
