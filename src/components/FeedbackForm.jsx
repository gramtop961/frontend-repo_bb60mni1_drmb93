import { useState } from "react";
import { MessageSquare, Send } from "lucide-react";

export default function FeedbackForm({ onSubmit }) {
  const [areas, setAreas] = useState([]);
  const [message, setMessage] = useState("");

  const toggle = (k) => {
    setAreas((prev) => (prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ areas, message });
    setMessage("");
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
          <MessageSquare className="h-5 w-5 text-indigo-300" />
        </div>
        <h2 className="text-lg font-semibold">Help us improve Rexr</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="text-sm text-slate-300 mb-2">What do you want more of?</p>
          <div className="flex flex-wrap gap-2">
            {[
              "Contests",
              "Remote internships",
              "Mentorship",
              "Skill showcases",
              "Job postings",
              "Career tools",
            ].map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => toggle(k)}
                className={`text-sm rounded-full border px-3 py-1.5 transition-colors ${
                  areas.includes(k)
                    ? "bg-indigo-500 border-indigo-500 text-white"
                    : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
                }`}
              >
                {k}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-2">Anything else we should know?</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Share your needs, goals, or feedback"
          />
        </div>

        <div className="flex items-center justify-end">
          <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 px-4 py-2 text-sm font-medium">
            <Send className="h-4 w-4" /> Submit Feedback
          </button>
        </div>
      </form>
    </section>
  );
}
