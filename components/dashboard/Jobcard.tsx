"use client";

import { useState } from "react";
import { Job, JobStatus } from "@/types/job";
import { Badge } from "@/components/ui/badge";

const statusVariants: Record<JobStatus, string> = {
  applied:   "bg-blue-500/10 text-blue-500 border-blue-500/30 hover:bg-blue-500/20",
  interview: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20",
  offer:     "bg-amber-500/10 text-amber-500 border-amber-500/30 hover:bg-amber-500/20",
  rejected:  "bg-red-500/10 text-red-500 border-red-500/30 hover:bg-red-500/20",
  saved:     "bg-zinc-500/10 text-zinc-500 border-zinc-500/30 hover:bg-zinc-500/20",
};

const statusLabels: Record<JobStatus, string> = {
  applied: "Applied", interview: "Interview",
  offer: "Offer 🎉", rejected: "Rejected", saved: "Saved",
};

interface JobCardProps {
  job: Job;
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
  onEdit: (job: Job) => void;
}

export function JobCard({ job, onStatusChange, onDelete, onEdit }: JobCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const daysAgo = Math.floor(
    (Date.now() - new Date(job.appliedDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className={`group relative border rounded-xl p-4 transition-all duration-200
      bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800
      hover:border-zinc-300 dark:hover:border-zinc-700
      ${deleting ? "opacity-50 scale-95" : ""}`}>

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {job.company.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-sm truncate text-zinc-900 dark:text-white">
                {job.role}
              </h3>
              <Badge variant="outline" className={`text-xs font-medium ${statusVariants[job.status]}`}>
                {statusLabels[job.status]}
              </Badge>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{job.company}</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-zinc-400 dark:text-zinc-600">
              {job.location && <span>📍 {job.location}</span>}
              {job.salary   && <span>💰 {job.salary}</span>}
              <span>{daysAgo === 0 ? "Today" : `${daysAgo}d ago`}</span>
            </div>
            {job.notes && (
              <p className="mt-2 text-xs line-clamp-1 text-zinc-400 dark:text-zinc-500">
                💬 {job.notes}
              </p>
            )}
          </div>
        </div>

        <div className="relative shrink-0">
          <button onClick={() => setShowMenu(!showMenu)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg font-bold text-lg leading-none
              text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white
              hover:bg-zinc-100 dark:hover:bg-zinc-800">
            ···
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 z-20 rounded-xl py-1 min-w-[160px] shadow-xl
              bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700">
              <p className="px-3 py-1.5 text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Update Status
              </p>
              {(["applied", "interview", "offer", "rejected"] as JobStatus[]).map((s) => (
                <button key={s}
                  onClick={() => { onStatusChange(job.id, s); setShowMenu(false); }}
                  className={`w-full text-left px-3 py-1.5 text-sm transition-colors
                    hover:bg-zinc-100 dark:hover:bg-zinc-800
                    ${job.status === s ? "text-violet-500" : "text-zinc-700 dark:text-zinc-300"}`}>
                  {job.status === s ? "✓ " : "  "}{statusLabels[s]}
                </button>
              ))}
              <hr className="my-1 border-zinc-200 dark:border-zinc-700" />
              {job.url && (
                <a href={job.url} target="_blank" rel="noopener noreferrer"
                  onClick={() => setShowMenu(false)}
                  className="block px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                  🔗 View Posting
                </a>
              )}
              <button onClick={() => { setShowMenu(false); onEdit(job); }}
                className="w-full text-left px-3 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                ✏️ Edit
              </button>
              <button onClick={() => { setShowMenu(false); setDeleting(true); onDelete(job.id); }}
                className="w-full text-left px-3 py-1.5 text-sm text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800">
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