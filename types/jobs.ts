export type JobStatus = "applied" | "interview" | "offer" | "rejected" | "saved";

export interface Job {
  id: string;
  company: string;
  role: string;
  location: string;
  salary?: string;
  status: JobStatus;
  appliedDate: string;
  notes?: string;
  url?: string;
  createdAt: string;
}

export interface DashboardStats {
  total: number;
  applied: number;
  interviews: number;
  offers: number;
  rejected: number;
}