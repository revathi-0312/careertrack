import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { listJobs, addJob } from "@/lib/jobs";

import type { NextRequest } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await listJobs(userId);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { company, role, status, location, salary, appliedDate, notes, url } = body;
  if (!company || !role || !status) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  const job = await addJob(userId, { company, role, status, location, salary, appliedDate, notes, url });
  return NextResponse.json(job, { status: 201 });
}
