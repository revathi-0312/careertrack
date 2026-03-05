import { ref, get, push, set, remove } from "firebase/database";
import { db } from "@/lib/firebase";
import { Job, JobStatus } from "@/types/job";

export async function listJobs(userId: string): Promise<Job[]> {
  const snapshot = await get(ref(db, `users/${userId}/jobs`));
  const data = snapshot.val();
  if (!data) return [];
  return Object.entries(data).map(([id, val]) => ({
    id,
    ...(val as Omit<Job, "id">),
  }));
}

export async function addJob(
  userId: string,
  job: Omit<Job, "id" | "createdAt">
): Promise<Job> {
  const jobsRef = ref(db, `users/${userId}/jobs`);
  const newRef = await push(jobsRef, {
    ...job,
    createdAt: new Date().toISOString(),
  });
  return { id: newRef.key!, ...job, createdAt: new Date().toISOString() };
}

export async function updateJob(
  userId: string,
  jobId: string,
  updates: Partial<Omit<Job, "id">>
): Promise<Job | null> {
  const jobRef = ref(db, `users/${userId}/jobs/${jobId}`);
  const snapshot = await get(jobRef);
  if (!snapshot.exists()) return null;
  await set(jobRef, { ...snapshot.val(), ...updates });
  return { id: jobId, ...snapshot.val(), ...updates } as Job;
}

export async function deleteJob(userId: string, jobId: string): Promise<void> {
  await remove(ref(db, `users/${userId}/jobs/${jobId}`));
}

export async function updateJobStatus(
  userId: string,
  jobId: string,
  status: JobStatus
): Promise<void> {
  await set(ref(db, `users/${userId}/jobs/${jobId}/status`), status);
}