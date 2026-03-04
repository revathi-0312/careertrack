import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {/* global header with auth controls */}
            <div className="absolute top-6 right-6 flex items-center space-x-4">
              <ThemeToggle />
              <SignedOut>
                {/* When the user is signed out show a button that sends them to
                    the hosted sign-in page.  `fallbackRedirectUrl` tells Clerk where to go
                    after a successful sign‑in. */}
                <SignInButton mode="redirect" fallbackRedirectUrl="/dashboard">
                  <Button size="sm">Sign In</Button>
                </SignInButton>
              </SignedOut>
              {/* Fallback link: visible even if Clerk fails to initialize so you can
                  still reach the sign-in page while debugging auth config. */}
              <a href="/sign-in" className="text-sm underline text-primary-600 dark:text-primary-300">Sign In</a>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
            {children}
          </ThemeProvider>
        </ClerkProvider>
 
      </body>
    </html>
  )
}