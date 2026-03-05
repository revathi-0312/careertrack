"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Job } from "@/types/job";

interface EditJobModalProps {
  job: Job;
  onClose: () => void;
  onSave: (jobId: string, updates: Partial<Omit<Job, "id">>) => Promise<void>;
}

export function EditJobModal({ job, onClose, onSave }: EditJobModalProps) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    company: job.company,
    role: job.role,
    location: job.location ?? "",
    salary: job.salary ?? "",
    status: job.status,
    appliedDate: job.appliedDate,
    notes: job.notes ?? "",
    url: job.url ?? "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.company || !form.role) return;
    setLoading(true);
    await onSave(job.id, form);
    setLoading(false);
    onClose();
  };

  const modalBg      = dark ? "bg-zinc-900 border-zinc-700"       : "bg-white border-zinc-200";
  const headerBorder = dark ? "border-zinc-800"                   : "border-zinc-100";
  const titleColor   = dark ? "text-white"                        : "text-zinc-900";
  const closeColor   = dark ? "text-zinc-500 hover:text-white"    : "text-zinc-400 hover:text-zinc-900";
  const labelClass   = `block text-xs font-medium mb-1.5 ${dark ? "text-zinc-400" : "text-zinc-600"}`;
  const inputClass   = `w-full border text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-colors ${
    dark
      ? "bg-zinc-800 border-zinc-700 text-white placeholder-zinc-600"
      : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder-zinc-400"
  }`;
  const cancelClass  = dark
    ? "text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700"
    : "text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative border rounded-2xl w-full max-w-md shadow-2xl ${modalBg}`}>

        <div className={`flex items-center justify-between p-5 border-b ${headerBorder}`}>
          <h2 className={`font-semibold ${titleColor}`}>Edit Job Application</h2>
          <button onClick={onClose} className={`transition-colors text-lg ${closeColor}`}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Company *</label>
              <input className={inputClass} placeholder="Google" value={form.company}
                onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))} required />
            </div>
            <div>
              <label className={labelClass}>Role *</label>
              <input className={inputClass} placeholder="Software Engineer" value={form.role}
                onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Location</label>
              <input className={inputClass} placeholder="Remote / NYC" value={form.location}
                onChange={(e) => setForm(f => ({ ...f, location: e.target.value }))} />
            </div>
            <div>
              <label className={labelClass}>Salary Range</label>
              <input className={inputClass} placeholder="$120k–$150k" value={form.salary}
                onChange={(e) => setForm(f => ({ ...f, salary: e.target.value }))} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Status</label>
              <select className={inputClass} value={form.status}
                onChange={(e) => setForm(f => ({ ...f, status: e.target.value as Job["status"] }))}>
                <option value="saved">Saved</option>
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Applied Date</label>
              <input type="date" className={inputClass} value={form.appliedDate}
                onChange={(e) => setForm(f => ({ ...f, appliedDate: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Job URL</label>
            <input className={inputClass} placeholder="https://careers.google.com/..."
              value={form.url} onChange={(e) => setForm(f => ({ ...f, url: e.target.value }))} />
          </div>

          <div>
            <label className={labelClass}>Notes</label>
            <textarea className={`${inputClass} resize-none`} rows={3}
              placeholder="Referral from John, strong culture fit..."
              value={form.notes} onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))} />
          </div>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose}
              className={`flex-1 px-4 py-2.5 text-sm rounded-lg transition-colors ${cancelClass}`}>
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}