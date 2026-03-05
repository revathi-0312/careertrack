"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f]">
      <div className="h-14 border-b border-zinc-200 dark:border-zinc-800" />
      <div className="pt-14">{children}</div>
    </div>
  );

  const dark = resolvedTheme === "dark";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#0a0a0f] text-white" : "bg-zinc-50 text-zinc-900"}`}>
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${dark ? "bg-[#0a0a0f]/80 border-zinc-800/60" : "bg-white/80 border-zinc-200"}`}>
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

          
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                CT
              </div>
              <span className="font-semibold text-sm">CareerTrack</span>
            

          <div className="flex items-center gap-3">
            <Link href="/dashboard"
              className={`text-sm transition-colors ${dark ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"}`}>
              Dashboard
            </Link>
            <ThemeToggle />
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          </div>

        </div>
      </nav>

      <div className="pt-14">{children}</div>
    </div>
  );
}