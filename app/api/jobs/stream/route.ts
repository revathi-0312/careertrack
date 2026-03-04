import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { subscribe } from "@/lib/jobs";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stream = new ReadableStream({
    start(controller) {
      // noop
    },
    cancel() {
      // noop - removed by cleanup below
    },
  });

  const writer = stream.getWriter();
  const unsubscribe = subscribe(userId, writer);

  // when the client closes, cleanup
  const response = new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });

  // tie cancellation to unsubscribe
  response.signal.addEventListener("abort", () => {
    unsubscribe();
    writer.close();
  });

  return response;
}