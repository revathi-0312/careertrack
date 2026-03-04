import { redirect } from "next/dist/client/components/navigation";
import { auth } from "@clerk/nextjs/server";
import { DashboardContent } from "@/components/dashboard/DashboardContent";


export default async function DashboardPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    // use Clerk helper which performs proper redirect rather than hitting /sign-in
    redirectToSignIn();
  }

  return <DashboardContent />;
}