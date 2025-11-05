import { useState } from "react";
import { User, Send } from "lucide-react";

export default function ProfileForm({ profile, onSave }) {
  const [form, setForm] = useState({
    name: profile?.name || "",
    bio: profile?.bio || "",
    avatar: profile?.avatar || "",
    skills: profile?.skills || [],
    age: profile?.age || "",
  });
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const s = skillInput.trim();
    if (!s) return;
    if (form.skills.includes(s)) return;
    setForm((f) => ({ ...f, skills: [...f.skills, s] }));
    setSkillInput("");
  };

  const removeSkill = (s) => {
    setForm((f) => ({ ...f, skills: f.skills.filter((x) => x !== s) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...form, age: form.age ? Number(form.age) : undefined });
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-lg bg-indigo-500/20 flex items-center justify-center">
          <User className="h-5 w-5 text-indigo-300" />
        </div>
        <h2 className="text-lg font-semibold">Your Profile</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <label className="block text-sm text-slate-300 mb-2">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Alex Doe"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm text-slate-300 mb-2">Age</label>
          <input
            type="number"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="18"
            min={13}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-slate-300 mb-2">Avatar URL</label>
          <input
            value={form.avatar}
            onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://images..."
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-slate-300 mb-2">Bio</label>
          <textarea
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={3}
            className="w-full rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Tell us about your interests and goals"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm text-slate-300 mb-2">Skills</label>
          <div className="flex gap-2">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="flex-1 rounded-lg bg-white/10 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., React, Design, Writing"
            />
            <button
              type="button"
              onClick={addSkill}
              className="rounded-lg bg-indigo-500 hover:bg-indigo-600 px-4 text-sm font-medium"
            >
              Add
            </button>
          </div>
          {!!form.skills.length && (
            <div className="mt-3 flex flex-wrap gap-2">
              {form.skills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-3 py-1 text-sm"
                >
                  {s}
                  <button
                    type="button"
                    onClick={() => removeSkill(s)}
                    className="text-slate-300 hover:text-white"
                    aria-label={`Remove ${s}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-green-500 hover:bg-green-600 px-4 py-2 text-sm font-medium"
          >
            <Send className="h-4 w-4" /> Save Profile
          </button>
        </div>
      </form>
    </section>
  );
}
