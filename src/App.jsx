import { useMemo, useState } from "react";
import Header from "./components/Header";
import ProfileForm from "./components/ProfileForm";
import OpportunitiesFeed from "./components/OpportunitiesFeed";
import FeedbackForm from "./components/FeedbackForm";

function Hero({ profile }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/30 via-violet-600/20 to-transparent p-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
          Discover contests and internships matched to your skills
        </h1>
        <p className="mt-3 text-slate-200">
          Rexr is a lightweight launch to gauge interest and gather feedback. Create a quick
          profile, browse curated opportunities, and tell us what you want next.
        </p>
      </div>

      {profile?.name ? (
        <div className="absolute right-4 bottom-4 hidden md:flex items-center gap-3 rounded-xl bg-white/10 border border-white/10 px-3 py-2">
          {profile.avatar ? (
            <img src={profile.avatar} alt="avatar" className="h-8 w-8 rounded-lg object-cover" />
          ) : (
            <div className="h-8 w-8 rounded-lg bg-white/20" />
          )}
          <div>
            <p className="text-sm text-white">Welcome back, {profile.name}</p>
            {profile.skills?.length ? (
              <p className="text-xs text-slate-200">Skills: {profile.skills.slice(0, 3).join(", ")}{profile.skills.length > 3 ? "…" : ""}</p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function App() {
  const [profile, setProfile] = useState(null);
  const [toasts, setToasts] = useState([]);

  const handleSaveProfile = (data) => {
    setProfile(data);
    pushToast("Profile saved");
  };

  const handleFeedback = (fb) => {
    pushToast("Thanks for your feedback!");
    // In a future phase, this would POST to the backend for analysis.
  };

  const pushToast = (msg) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  const scrollToProfile = () => {
    document.getElementById("profile-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const recommendationsTitle = useMemo(() => {
    if (!profile?.skills?.length) return "Curated Opportunities";
    const top = profile.skills.slice(0, 2).join(" • ");
    return `Opportunities for ${top}`;
  }, [profile]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header onCreateProfile={scrollToProfile} />

      <main className="mx-auto max-w-6xl px-4 py-8 space-y-8">
        <Hero profile={profile} />

        <section id="profile-section" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <ProfileForm profile={profile} onSave={handleSaveProfile} />
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold">{recommendationsTitle}</h2>
              <p className="text-sm text-slate-300">Fine-tuned as you update your profile.</p>
              <div className="mt-4">
                <OpportunitiesFeed profile={profile} />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <FeedbackForm onSubmit={handleFeedback} />
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-600/20 to-transparent p-6">
              <h3 className="text-white font-semibold">Roadmap sneak peek</h3>
              <ul className="mt-2 text-sm text-slate-200 list-disc list-inside space-y-1">
                <li>Creative feed to showcase projects</li>
                <li>Mentor network and verified postings</li>
                <li>Skill portfolios and career tools</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Toasts */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className="rounded-lg bg-white/10 border border-white/10 px-4 py-2 text-sm shadow-lg">
            {t.msg}
          </div>
        ))}
      </div>
    </div>
  );
}
