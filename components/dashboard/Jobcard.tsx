"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Job, JobStatus } from "@/types/jobs";

const statusStyles: Record<JobStatus, string> = {
  applied:   "bg-blue-500/10 text-blue-500 border-blue-500/30",
  interview: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  offer:     "bg-amber-500/10 text-amber-500 border-amber-500/30",
  rejected:  "bg-red-500/10 text-red-500 border-red-500/30",
  saved:     "bg-zinc-500/10 text-zinc-500 border-zinc-500/30",
};

const statusLabels: Record<JobStatus, string> = {
  applied: "Applied", interview: "Interview",
  offer: "Offer 🎉", rejected: "Rejected", saved: "Saved",
};

interface JobCardProps {
  job: Job;
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
}

export function JobCard({ job, onStatusChange, onDelete }: JobCardProps) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const [showMenu, setShowMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const cardBg      = dark ? "bg-zinc-900 border-zinc-800 hover:border-zinc-700" : "bg-white border-zinc-200 hover:border-zinc-300";
  const titleColor  = dark ? "text-white"    : "text-zinc-900";
  const compColor   = dark ? "text-zinc-400" : "text-zinc-500";
  const metaColor   = dark ? "text-zinc-600" : "text-zinc-400";
  const menuBg      = dark ? "bg-zinc-900 border-zinc-700" : "bg-white border-zinc-200 shadow-lg";
  const menuHover   = dark ? "hover:bg-zinc-800" : "hover:bg-zinc-50";
  const menuText    = dark ? "text-zinc-300" : "text-zinc-700";
  const menuDivider = dark ? "border-zinc-700" : "border-zinc-200";
  const dotBtnColor = dark ? "text-zinc-500 hover:text-white hover:bg-zinc-800" : "text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100";

  const daysAgo = Math.floor(
    (Date.now() - new Date(job.appliedDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className={`group relative border rounded-xl p-4 transition-all duration-200 ${cardBg} ${deleting ? "opacity-50 scale-95" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {job.company.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`font-semibold text-sm truncate ${titleColor}`}>{job.role}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusStyles[job.status]}`}>
                {statusLabels[job.status]}
              </span>
            </div>
            <p className={`text-sm ${compColor}`}>{job.company}</p>
            <div className={`flex items-center gap-3 mt-1 text-xs ${metaColor}`}>
              {job.location && <span>📍 {job.location}</span>}
              {job.salary   && <span>💰 {job.salary}</span>}
              <span>{daysAgo === 0 ? "Today" : `${daysAgo}d ago`}</span>
            </div>
            {job.notes && (
              <p className={`mt-2 text-xs line-clamp-1 ${metaColor}`}>💬 {job.notes}</p>
            )}
          </div>
        </div>

        {/* Actions menu */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg font-bold text-lg leading-none ${dotBtnColor}`}
          >
            ···
          </button>

          {showMenu && (
            <div className={`absolute right-0 top-8 z-20 border rounded-xl py-1 min-w-[160px] ${menuBg}`}>
              <p className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider ${compColor}`}>
                Update Status
              </p>
              {(["applied", "interview", "offer", "rejected"] as JobStatus[]).map((s) => (
                <button key={s} onClick={() => { onStatusChange(job.id, s); setShowMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-sm transition-colors ${menuHover} ${job.status === s ? "text-violet-500" : menuText}`}>
                  {job.status === s ? "✓ " : "  "}{statusLabels[s]}
                </button>
              ))}
              <hr className={`my-1 ${menuDivider}`} />
              {job.url && (
                <a href={job.url} target="_blank" rel="noopener noreferrer"
                  className={`block px-3 py-1.5 text-sm ${menuText} ${menuHover}`}
                  onClick={() => setShowMenu(false)}>
                  🔗 View Posting
                </a>
              )}
              <button onClick={() => { setShowMenu(false); setDeleting(true); onDelete(job.id); }}
                className={`w-full text-left px-3 py-1.5 text-sm text-red-500 ${menuHover}`}>
                🗑 Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {showMenu && <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />}
    </div>
  );
}