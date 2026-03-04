"use client";

import { useTheme } from "next-themes";
import { Job } from "@/types/jobs";

const statusEmoji: Record<string, string> = {
  applied: "📨", interview: "🎯", offer: "🎉", rejected: "❌", saved: "🔖",
};

export function ActivityFeed({ jobs }: { jobs: Job[] }) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const cardBg   = dark ? "bg-zinc-900 border-zinc-800"   : "bg-white border-zinc-200";
  const subtext  = dark ? "text-zinc-500"                  : "text-zinc-400";
  const mainText = dark ? "text-white"                     : "text-zinc-900";
  const barBg    = dark ? "bg-zinc-800"                    : "bg-zinc-200";

  const recent = jobs.slice(0, 8);
  const thisWeek = jobs.filter((j) => {
    const diff = (Date.now() - new Date(j.appliedDate).getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  return (
    <div className="space-y-4">
      {/* Weekly Stat */}
      <div className={`border rounded-xl p-4 ${cardBg}`}>
        <p className={`text-xs uppercase tracking-wider mb-1 ${subtext}`}>This Week</p>
        <p className={`text-2xl font-bold ${mainText}`}>
          {thisWeek}{" "}
          <span className={`text-base font-normal ${subtext}`}>
            application{thisWeek !== 1 ? "s" : ""}
          </span>
        </p>
        <div className={`mt-3 h-1 rounded-full overflow-hidden ${barBg}`}>
          <div
            className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full transition-all duration-700"
            style={{ width: `${Math.min((thisWeek / 10) * 100, 100)}%` }}
          />
        </div>
        <p className={`text-xs mt-1.5 ${subtext}`}>Goal: 10 per week</p>
      </div>

      {/* Recent Activity */}
      <div className={`border rounded-xl p-4 ${cardBg}`}>
        <p className={`text-xs uppercase tracking-wider mb-3 ${subtext}`}>Recent Activity</p>
        {recent.length === 0 ? (
          <p className={`text-sm text-center py-4 ${subtext}`}>No activity yet</p>
        ) : (
          <div className="space-y-3">
            {recent.map((job) => (
              <div key={job.id} className="flex items-center gap-3">
                <span className="text-lg">{statusEmoji[job.status] || "📋"}</span>
                <div className="min-w-0">
                  <p className={`text-sm truncate font-medium ${mainText}`}>{job.company}</p>
                  <p className={`text-xs truncate ${subtext}`}>{job.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pro Tip */}
      <div className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border border-violet-500/20 rounded-xl p-4">
        <p className="text-xs text-violet-500 font-medium uppercase tracking-wider mb-2">💡 Pro Tip</p>
        <p className={`text-xs leading-relaxed ${subtext}`}>
          Personalize your outreach for each application. A tailored cover letter increases response rates by up to 3x.
        </p>
      </div>
    </div>
  );
}