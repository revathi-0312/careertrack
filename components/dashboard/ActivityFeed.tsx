"use client";

import { useTheme } from "next-themes";
import { Job, JobStatus } from "@/types/job";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const statusEmoji: Record<string, string> = {
  applied: "📨", interview: "🎯", offer: "🎉", rejected: "❌", saved: "🔖",
};

const statusVariants: Record<JobStatus, string> = {
  applied:   "bg-blue-500/10 text-blue-500 border-blue-500/30",
  interview: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  offer:     "bg-amber-500/10 text-amber-500 border-amber-500/30",
  rejected:  "bg-red-500/10 text-red-500 border-red-500/30",
  saved:     "bg-zinc-500/10 text-zinc-500 border-zinc-500/30",
};

export function ActivityFeed({ jobs }: { jobs: Job[] }) {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  const subtext = dark ? "text-zinc-500" : "text-zinc-400";

  const recent = jobs.slice(0, 5);
  const thisWeek = jobs.filter((j) => {
    const diff = (Date.now() - new Date(j.appliedDate).getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  return (
    <div className="space-y-4">

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className={`text-xs uppercase tracking-wider font-medium ${subtext}`}>
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">
            {thisWeek}{" "}
            <span className={`text-base font-normal ${subtext}`}>
              application{thisWeek !== 1 ? "s" : ""}
            </span>
          </p>
          <Progress value={Math.min((thisWeek / 10) * 100, 100)} className="mt-3 h-1.5" />
          <p className={`text-xs mt-1.5 ${subtext}`}>Goal: 10 per week</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className={`text-xs uppercase tracking-wider font-medium ${subtext}`}>
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {recent.length === 0 ? (
            <p className={`text-sm text-center py-6 ${subtext}`}>No activity yet</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Company</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recent.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="py-2">
                      <div>
                        <p className="text-xs font-medium truncate max-w-[120px]">{job.company}</p>
                        <p className={`text-xs truncate max-w-[120px] ${subtext}`}>{job.role}</p>
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <Badge variant="outline" className={`text-xs ${statusVariants[job.status]}`}>
                        {statusEmoji[job.status]} {job.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-violet-500/10 to-indigo-500/10 border-violet-500/20">
        <CardContent className="pt-4">
          <p className="text-xs text-violet-500 font-medium uppercase tracking-wider mb-2">💡 Pro Tip</p>
          <p className={`text-xs leading-relaxed ${subtext}`}>
            Personalize your outreach for each application. A tailored cover letter increases response rates by up to 3x.
          </p>
        </CardContent>
      </Card>

    </div>
  );
}