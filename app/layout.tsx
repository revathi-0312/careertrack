import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "CareerTrack – Job Application Tracker",
  description: "Track your job applications in real time",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#7c3aed",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className="antialiased">
          {/* next-themes needs attribute="class" to add 'dark' to <html> */}
          <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}