"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  // The built-in <SignIn> component will render Clerk's hosted
  // sign-in flow at the `/sign-in` path.  `routing="path"` tells
  // Clerk to keep the user on the same URL instead of using its own
  // client‑side router.  We also provide `redirectUrl` so that once
  // authentication succeeds the user is sent to the dashboard.
  return (
    <SignIn
      path="/sign-in"
      routing="path"
      redirectUrl="/dashboard"
    />
  );
}
