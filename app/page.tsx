"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${dark ? "bg-[#0a0a0f] text-white" : "bg-white text-zinc-900"}`}>

      {/* ── Navbar ── */}
      <nav className={`px-6 py-4 flex items-center justify-between border-b transition-colors duration-300 ${dark ? "border-zinc-800/40" : "border-zinc-200"}`}>
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-violet-500/20">
            CT
          </div>
          <span className="font-semibold">CareerTrack</span>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            title="Toggle dark mode"
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all duration-200 border ${
              dark
                ? "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-yellow-400"
                : "bg-zinc-100 border-zinc-200 hover:bg-zinc-200 text-zinc-600"
            }`}
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* Clerk Auth Buttons */}
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className={`text-sm px-3 py-1.5 rounded-lg transition-colors font-medium border ${
                  dark
                    ? "text-zinc-300 hover:text-white border-zinc-700 hover:border-zinc-500 bg-zinc-800/50"
                    : "text-zinc-600 hover:text-zinc-900 border-zinc-200 bg-zinc-50 hover:bg-zinc-100"
                }`}
              >
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-1.5 rounded-lg transition-colors font-medium shadow-lg shadow-violet-500/20">
                Get Started
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <Link
              href="/dashboard"
              className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-1.5 rounded-lg transition-colors font-medium"
            >
              Dashboard →
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-24">
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-500 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          Real-time job tracking
        </div>

        <h1 className="text-5xl md:text-6xl font-bold max-w-3xl leading-tight">
          Track every{" "}
          <span className="bg-gradient-to-r from-violet-500 to-indigo-400 bg-clip-text text-transparent">
            application
          </span>{" "}
          in one place
        </h1>

        <p className={`mt-6 text-lg max-w-lg ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
          Never lose track of where you applied. CareerTrack gives you a
          real-time dashboard to manage your entire job search effortlessly.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center">
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl transition-colors text-sm shadow-lg shadow-violet-500/25">
                Start Tracking Free →
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button
                className={`px-6 py-3 font-medium rounded-xl transition-colors text-sm border ${
                  dark
                    ? "bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700"
                    : "bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-200"
                }`}
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl transition-colors text-sm"
            >
              Open Dashboard →
            </Link>
          </SignedIn>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl w-full">
          {[
            { icon: "⚡", title: "Real-time Sync",    desc: "Firebase Realtime DB — updates across all your devices instantly" },
            { icon: "🔒", title: "Secure Auth",        desc: "Clerk authentication with Google, GitHub, or email sign-in" },
            { icon: "📊", title: "Smart Dashboard",    desc: "Track stats, pipeline stages, and weekly application goals" },
          ].map((f) => (
            <div
              key={f.title}
              className={`rounded-xl p-5 text-left border transition-colors duration-300 ${
                dark ? "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700" : "bg-zinc-50 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-sm mb-1">{f.title}</h3>
              <p className={`text-xs leading-relaxed ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}