import { Rocket, User } from "lucide-react";

export default function Header({ onCreateProfile }) {
  return (
    <header className="sticky top-0 z-20 backdrop-blur border-b border-white/10 bg-gradient-to-b from-slate-900/70 to-slate-900/30">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-white font-semibold tracking-tight">Rexr</p>
            <p className="text-xs text-slate-300">Explore. Learn. Win.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCreateProfile}
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/15 text-white px-4 py-2 transition-colors"
          >
            <User className="h-4 w-4" />
            <span className="text-sm font-medium">My Profile</span>
          </button>
        </div>
      </div>
    </header>
  );
}
