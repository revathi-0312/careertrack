"use client";

import * as React from "react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { ApplicationsBarChart } from "@/components/dashboard/ApplicationsBarChart";
import { StatusPieChart } from "@/components/dashboard/StatusPieChart";
import { ApplicationsTable } from "@/components/dashboard/ApplicationsTable";
import { ThemeToggle } from "@/components/ThemeToggle";

export function DashboardContent() {
  const [jobs, setJobs] = React.useState<any[]>([]);

  const fetchJobs = async () => {
    const res = await fetch("/api/jobs");
    if (res.ok) {
      const data = await res.json();
      setJobs(data);
    }
  };

  React.useEffect(() => {
    fetchJobs();
    const es = new EventSource("/api/jobs/stream");
    es.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setJobs(data);
    };
    return () => es.close();
  }, []);

  // compute metrics
  const total = jobs.length;
  const interviews = jobs.filter((j) => j.status === "Interview").length;
  const offers = jobs.filter((j) => j.status === "Offer").length;

  // monthly counts
  const monthly = React.useMemo(() => {
    const map: Record<string, number> = {};
    jobs.forEach((j) => {
      const m = new Date(j.createdAt).toLocaleString("default", { month: "short" });
      map[m] = (map[m] || 0) + 1;
    });
    return Object.entries(map).map(([month, count]) => ({ month, count }));
  }, [jobs]);

  const statusDist = React.useMemo(() => {
    const counts: Record<string, number> = {};
    jobs.forEach((j) => {
      counts[j.status] = (counts[j.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [jobs]);

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-purple-300 via-background to-pink-500 dark:from-cyan-900 dark:via-background dark:to-blue-800 min-h-screen">
      {/* layout already renders the theme toggle and user/profile button in the top-right
          so we don't need a second moon icon here; the additional div was hiding the
          sign‑out control when signed in. */}
      <div className="absolute top-6 left-6">
        {/* back button will be in page itself */}
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Track your job applications and career growth</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 mt-10">
        <KpiCard title="Total Applications" value={total} />
        <KpiCard title="Interviews Scheduled" value={interviews} />
        <KpiCard title="Offers Received" value={offers} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ApplicationsBarChart data={monthly} />
        <StatusPieChart data={statusDist} />
      </div>
      <ApplicationsTable />
    </div>
  );
}
