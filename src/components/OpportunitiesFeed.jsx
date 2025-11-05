import { useMemo, useState } from "react";
import { Search, Trophy, Briefcase, SlidersHorizontal, Star } from "lucide-react";

const sampleData = [
  {
    id: "c1",
    type: "contest",
    title: "National Coding Challenge",
    org: "Code League",
    age: "14+",
    skills: ["JavaScript", "Algorithms"],
    link: "https://example.com/coding-challenge",
  },
  {
    id: "c2",
    type: "contest",
    title: "Creative Writing Sprint",
    org: "Writers Guild",
    age: "13+",
    skills: ["Writing", "Storytelling"],
    link: "https://example.com/writing-sprint",
  },
  {
    id: "i1",
    type: "internship",
    title: "Remote Design Intern",
    org: "Pixel Studio",
    age: "16+",
    skills: ["Figma", "UI"],
    link: "https://example.com/design-intern",
  },
  {
    id: "i2",
    type: "internship",
    title: "Marketing Research Intern",
    org: "Bright Labs",
    age: "15+",
    skills: ["Research", "Excel"],
    link: "https://example.com/marketing-intern",
  },
];

export default function OpportunitiesFeed({ profile }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return sampleData.filter((item) => {
      const matchesType = type === "all" || item.type === type;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.org.toLowerCase().includes(q) ||
        item.skills.some((s) => s.toLowerCase().includes(q));
      const ageOk = profile?.age ? Number(String(profile.age)) >= Number(item.age.replace("+", "")) : true;
      return matchesType && matchesQuery && ageOk;
    });
  }, [query, type, profile]);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-white text-lg font-semibold">Curated Opportunities</h2>
          <p className="text-slate-300 text-sm">Contests and verified remote internships tailored to you.</p>
        </div>
        <div className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search titles, orgs, skills"
              className="w-full rounded-lg bg-white/10 border border-white/10 pl-9 pr-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={() => setType(type === "all" ? "contest" : type === "contest" ? "internship" : "all")}
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-white"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="text-sm capitalize">{type}</span>
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <article key={item.id} className="rounded-xl border border-white/10 bg-slate-900/40 p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                  {item.type === "contest" ? (
                    <Trophy className="h-5 w-5 text-indigo-300" />
                  ) : (
                    <Briefcase className="h-5 w-5 text-indigo-300" />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-medium leading-tight">{item.title}</h3>
                  <p className="text-sm text-slate-300">{item.org} • Age {item.age}</p>
                </div>
              </div>
              {profile?.skills?.length ? (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-amber-400" />
                  <p className="text-xs text-amber-300">Matches {matchPercent(item, profile)}%</p>
                </div>
              ) : null}
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {item.skills.map((s) => (
                <span key={s} className="text-xs rounded-full bg-white/10 border border-white/10 px-2 py-1 text-slate-200">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-indigo-300 hover:text-indigo-200 underline"
              >
                View details
              </a>
              <button className="rounded-lg bg-indigo-500 hover:bg-indigo-600 px-3 py-1.5 text-sm text-white">Save</button>
            </div>
          </article>
        ))}

        {!filtered.length && (
          <div className="col-span-full text-center text-slate-300 py-10">No results match your filters.</div>
        )}
      </div>
    </section>
  );
}

function matchPercent(item, profile) {
  const skills = (profile?.skills || []).map((s) => s.toLowerCase());
  const tags = item.skills.map((s) => s.toLowerCase());
  if (!skills.length || !tags.length) return 0;
  const overlap = tags.filter((t) => skills.includes(t)).length;
  return Math.round((overlap / tags.length) * 100);
}
