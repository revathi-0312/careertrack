"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { ref, onValue, push, set, remove, update } from "firebase/database";
import { db } from "@/lib/firebase";
import { JobCard } from "@/components/dashboard/JobCard";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { AddJobModal } from "@/components/dashboard/AddJobModal";
import { EditJobModal } from "@/components/dashboard/EditJobModal";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Job, DashboardStats } from "@/types/job";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    total: 0, applied: 0, interviews: 0, offers: 0, rejected: 0,
  });
  const [dbLoading, setDbLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (!isLoaded) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!user?.id) { setDbLoading(false); return; }

    setError(null);
    const jobsRef = ref(db, `users/${user.id}/jobs`);

    const unsubscribe = onValue(jobsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const jobList: Job[] = Object.entries(data).map(([id, val]) => ({
            id, ...(val as Omit<Job, "id">),
          }));
          jobList.sort((a, b) =>
            new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
          );
          setJobs(jobList);
          setStats({
            total: jobList.length,
            applied: jobList.filter(j => j.status === "applied").length,
            interviews: jobList.filter(j => j.status === "interview").length,
            offers: jobList.filter(j => j.status === "offer").length,
            rejected: jobList.filter(j => j.status === "rejected").length,
          });
        } else {
          setJobs([]);
          setStats({ total: 0, applied: 0, interviews: 0, offers: 0, rejected: 0 });
        }
        setDbLoading(false);
      },
      (err: Error) => { setError(err.message); setDbLoading(false); }
    );

    return () => unsubscribe();
  }, [isLoaded, user?.id]);

  const addJob = async (jobData: Omit<Job, "id">) => {
    if (!user?.id) return;
    await push(ref(db, `users/${user.id}/jobs`), {
      ...jobData, createdAt: new Date().toISOString(),
    });
  };

  const updateJobStatus = async (jobId: string, status: Job["status"]) => {
    if (!user?.id) return;
    await set(ref(db, `users/${user.id}/jobs/${jobId}/status`), status);
  };

  const updateJob = async (jobId: string, updates: Partial<Omit<Job, "id">>) => {
    if (!user?.id) return;
    await update(ref(db, `users/${user.id}/jobs/${jobId}`), updates);
  };

  const deleteJob = async (jobId: string) => {
    if (!user?.id) return;
    await remove(ref(db, `users/${user.id}/jobs/${jobId}`));
  };

  const filteredJobs = filter === "all" ? jobs : jobs.filter(j => j.status === filter);

  if (!isLoaded || dbLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0f]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
            {!isLoaded ? "Signing you in..." : "Loading your tracker..."}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0f]">
        <div className="text-center max-w-md px-6">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white">
            Firebase Connection Error
          </h2>
          <p className="text-sm mb-4 text-zinc-500">{error}</p>
          <div className="text-xs p-3 rounded-lg text-left font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            Check your <strong>.env.local</strong> —<br />
            make sure NEXT_PUBLIC_FIREBASE_DATABASE_URL is correct.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] text-zinc-900 dark:text-white">
      <div className="border-b border-zinc-200 dark:border-zinc-800/50 px-6 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">
              Welcome back,{" "}
              <span className="text-violet-500">
                {user?.firstName ||
                  user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
                  "there"}
              </span>{" "}
              👋
            </h1>
            <p className="text-sm mt-0.5 text-zinc-500 dark:text-zinc-400">
              Track your job applications in real time
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            + Add Job
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <StatsCards stats={stats} />

        <div className="flex gap-2 flex-wrap">
          {["all", "applied", "interview", "offer", "rejected"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${filter === f
                ? "bg-violet-600 text-white"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}>
              {f === "all" ? `All (${jobs.length})` : f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {filteredJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-lg font-medium">No jobs here yet</p>
                <p className="text-sm mt-1 text-zinc-400 dark:text-zinc-500">
                  Click <strong>+ Add Job</strong> to track your first application
                </p>
                <button onClick={() => setShowAddModal(true)}
                  className="mt-6 px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors">
                  + Add Your First Job
                </button>
              </div>
            ) : (
              filteredJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onStatusChange={updateJobStatus}
                  onDelete={deleteJob}
                  onEdit={setEditingJob}
                />
              ))
            )}
          </div>
          <div className="lg:col-span-1">
            <ActivityFeed jobs={jobs} />
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddJobModal onClose={() => setShowAddModal(false)} onAdd={addJob} />
      )}

      {editingJob && (
        <EditJobModal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSave={updateJob}
        />
      )}
    </div>
  );
}