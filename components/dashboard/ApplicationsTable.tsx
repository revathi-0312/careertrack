"use client";

import * as React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow, TableCell } from "../ui/table";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { AddJobDialog } from "@/components/AddJobDialog";

interface JobRecord {
  id: string;
  company: string;
  role: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  createdAt: number;
  updatedAt: number;
}

export function ApplicationsTable() {
  const [jobs, setJobs] = React.useState<JobRecord[]>([]);

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
    return () => {
      es.close();
    };
  }, []);

  return (
    <Card className="transition-all duration-500 hover:shadow-xl">
      <CardHeader className="flex justify-between items-center">
        <CardTitle className="text-sm font-medium">Recent Applications</CardTitle>
        <AddJobDialog onSuccess={fetchJobs} />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{app.company}</TableCell>
                <TableCell>{app.role}</TableCell>
                <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge>{app.status}</Badge>
                </TableCell>
                <TableCell>
                  <AddJobDialog job={app} onSuccess={fetchJobs} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}