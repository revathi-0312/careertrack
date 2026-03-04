import { prisma } from "@/lib/prisma";

export type JobStatus = "Applied" | "Interview" | "Offer" | "Rejected";

export interface Job {
  id: string;
  company: string;
  role: string;
  status: JobStatus;
  userId: string;
  createdAt: number;
  updatedAt: number;
}

// SSE subscribers keyed by userId
const subscribers = new Map<string, Set<WritableStreamDefaultWriter>>();

export async function listJobs(userId: string): Promise<Job[]> {
  const jobs = await prisma.job.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return jobs.map((j) => ({
    id: j.id,
    company: j.company,
    role: j.role,
    status: j.status as JobStatus,
    userId: j.userId,
    createdAt: j.createdAt.getTime(),
    updatedAt: j.updatedAt.getTime(),
  }));
}

export async function addJob(
  userId: string,
  data: { company: string; role: string; status: JobStatus }
): Promise<Job> {
  const j = await prisma.job.create({
    data: { userId, company: data.company, role: data.role, status: data.status },
  });
  notify(userId);
  return {
    id: j.id,
    company: j.company,
    role: j.role,
    status: j.status as JobStatus,
    userId: j.userId,
    createdAt: j.createdAt.getTime(),
    updatedAt: j.updatedAt.getTime(),
  };
}

export async function updateJob(
  userId: string,
  id: string,
  data: Partial<Omit<Job, "id" | "userId" | "createdAt">>
): Promise<Job | null> {
  const existing = await prisma.job.findFirst({ where: { id, userId } });
  if (!existing) return null;
  const updated = await prisma.job.update({
    where: { id },
    data: { ...data },
  });
  notify(userId);
  return {
    id: updated.id,
    company: updated.company,
    role: updated.role,
    status: updated.status as JobStatus,
    userId: updated.userId,
    createdAt: updated.createdAt.getTime(),
    updatedAt: updated.updatedAt.getTime(),
  };
}

async function notify(userId: string) {
  const arr = await listJobs(userId);
  const subs = subscribers.get(userId);
  if (!subs) return;
  const payload = `data: ${JSON.stringify(arr)}\n\n`;
  for (const writer of subs) {
    try {
      writer.write(payload);
    } catch (e) {
      // ignore, maybe closed
    }
  }
}

export function subscribe(userId: string, writer: WritableStreamDefaultWriter) {
  let set = subscribers.get(userId);
  if (!set) {
    set = new Set();
    subscribers.set(userId, set);
  }
  set.add(writer);
  // send initial data
  listJobs(userId).then((jobs) => {
    writer.write(`data: ${JSON.stringify(jobs)}\n\n`);
  });
  return () => {
    set!.delete(writer);
  };
}
