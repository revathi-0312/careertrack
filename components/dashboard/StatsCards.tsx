"use client";

import { useTheme } from "next-themes";
import { DashboardStats } from "@/types/jobs";

const statConfig = [
  { key: "total",     label: "Total Applied", icon: "📋", text: "text-violet-500",  border: "border-violet-500/30", bg: "from-violet-500/10 to-violet-500/5" },
  { key: "applied",   label: "Pending",       icon: "⏳", text: "text-blue-500",    border: "border-blue-500/30",   bg: "from-blue-500/10 to-blue-500/5" },
  { key: "interviews",label: "Interviews",    icon: "🎯", text: "text-emerald-500", border: "border-emerald-500/30",bg: "from-emerald-500/10 to-emerald-500/5" },
  { key: "offers",    label: "Offers",        icon: "🎉", text: "text-amber-500",   border: "border-amber-500/30",  bg: "from-amber-500/10 to-amber-500/5" },
  { key: "rejected",  label: "Rejected",      icon: "❌", text: "text-red-500",     border: "border-red-500/30",    bg: "from-red-500/10 to-red-500/5" },
];

export function StatsCards({ stats }: { stats: DashboardStats }) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  const cardBg   = dark ? "bg-zinc-900"   : "bg-white";
  const cardText = dark ? "text-zinc-400" : "text-zinc-500";
  const barBg    = dark ? "bg-zinc-800"   : "bg-zinc-200";
  const legendText = dark ? "text-zinc-500" : "text-zinc-400";

  const successRate = stats.total > 0
    ? Math.round((stats.interviews / stats.total) * 100)
    : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {statConfig.map((s) => (
          <div
            key={s.key}
            className={`rounded-xl border ${s.border} bg-gradient-to-br ${s.bg} ${cardBg} p-4`}
          >
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className={`text-2xl font-bold ${s.text}`}>
              {stats[s.key as keyof DashboardStats]}
            </div>
            <div className={`text-xs mt-1 ${cardText}`}>{s.label}</div>
          </div>
        ))}
      </div>

      {stats.total > 0 && (
        <div className={`${cardBg} border ${dark ? "border-zinc-800" : "border-zinc-200"} rounded-xl p-4`}>
          <div className="flex justify-between text-sm mb-3">
            <span className={cardText}>Pipeline Progress</span>
            <span className="text-emerald-500 font-medium">{successRate}% interview rate</span>
          </div>
          <div className={`flex h-2 rounded-full overflow-hidden ${barBg} gap-0.5`}>
            {[
              { val: stats.applied,    color: "bg-blue-500" },
              { val: stats.interviews, color: "bg-emerald-500" },
              { val: stats.offers,     color: "bg-amber-500" },
              { val: stats.rejected,   color: "bg-red-500" },
            ].map(({ val, color }, i) => (
              <div key={i} className={`${color} transition-all duration-500`}
                style={{ width: `${(val / stats.total) * 100}%` }} />
            ))}
          </div>
          <div className="flex gap-4 mt-3 flex-wrap">
            {[
              { label: "Applied",   color: "bg-blue-500" },
              { label: "Interview", color: "bg-emerald-500" },
              { label: "Offer",     color: "bg-amber-500" },
              { label: "Rejected",  color: "bg-red-500" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span className={`text-xs ${legendText}`}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}