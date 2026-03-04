import { clerkMiddleware } from "@clerk/nextjs/server";

// Protect all routes by default, but allow public paths (home, sign-in/up, api, static)
export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api(.*)",
    "/_next/(.*)",
    "/favicon.ico",
  ],
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
