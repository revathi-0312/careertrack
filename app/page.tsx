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
    <div className={`min-h-screen flex flex-col transition-colors duration-500 relative overflow-hidden ${dark ? "bg-[#0a0a0f] text-white" : "bg-slate-50 text-zinc-900"}`}>

      {/* ── Animated Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

        {/* Animated gradient orbs */}
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse ${dark ? "bg-violet-600" : "bg-violet-400"}`}
          style={{ animationDuration: "4s" }} />
        <div className={`absolute top-1/3 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse ${dark ? "bg-indigo-600" : "bg-indigo-400"}`}
          style={{ animationDuration: "6s", animationDelay: "1s" }} />
        <div className={`absolute -bottom-20 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${dark ? "bg-violet-800" : "bg-purple-300"}`}
          style={{ animationDuration: "5s", animationDelay: "2s" }} />

        {/* SVG geometric pattern */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="finegrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none"
                stroke={dark ? "rgba(139,92,246,0.06)" : "rgba(109,40,217,0.06)"}
                strokeWidth="0.5" />
            </pattern>
            <pattern id="coarsegrid" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 120 0 L 0 0 0 120" fill="none"
                stroke={dark ? "rgba(139,92,246,0.1)" : "rgba(109,40,217,0.08)"}
                strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#finegrid)" />
          <rect width="100%" height="100%" fill="url(#coarsegrid)" />

          {/* Dashed diagonal lines */}
          <line x1="-10%" y1="40%" x2="50%" y2="-10%"
            stroke={dark ? "rgba(139,92,246,0.15)" : "rgba(109,40,217,0.12)"}
            strokeWidth="1" strokeDasharray="8 16" />
          <line x1="50%" y1="110%" x2="110%" y2="50%"
            stroke={dark ? "rgba(99,102,241,0.15)" : "rgba(99,102,241,0.12)"}
            strokeWidth="1" strokeDasharray="8 16" />
          <line x1="-10%" y1="70%" x2="70%" y2="-10%"
            stroke={dark ? "rgba(139,92,246,0.08)" : "rgba(109,40,217,0.07)"}
            strokeWidth="1" strokeDasharray="4 20" />

          {/* Hexagon accents */}
          <polygon points="80,60 110,43 140,60 140,94 110,111 80,94"
            fill="none"
            stroke={dark ? "rgba(139,92,246,0.2)" : "rgba(109,40,217,0.15)"}
            strokeWidth="1.5" />

          {/* Corner triangles — fixed coords, no calc() */}
          <polygon points="0,0 180,0 0,180"
            fill={dark ? "rgba(139,92,246,0.04)" : "rgba(109,40,217,0.04)"} />
          <polygon points="1920,1080 1740,1080 1920,900"
            fill={dark ? "rgba(99,102,241,0.04)" : "rgba(99,102,241,0.04)"} />

          {/* Accent dots */}
          {[[100,100],[400,80],[750,200],[1100,100],[300,500],[900,450],[1300,350],[150,750],[650,700],[1100,650]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5"
              fill={dark ? "rgba(139,92,246,0.4)" : "rgba(109,40,217,0.3)"} />
          ))}
        </svg>

        {/* Radial glow */}
        <div className="absolute inset-0" style={{
          background: dark
            ? "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(139,92,246,0.08) 0%, transparent 65%)"
            : "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(139,92,246,0.07) 0%, transparent 65%)",
        }} />

        {/* Edge fades */}
        <div className="absolute inset-x-0 top-0 h-40" style={{
          background: dark ? "linear-gradient(to bottom, rgba(10,10,15,0.6), transparent)" : "linear-gradient(to bottom, rgba(248,250,252,0.6), transparent)",
        }} />
        <div className="absolute inset-x-0 bottom-0 h-40" style={{
          background: dark ? "linear-gradient(to top, rgba(10,10,15,0.6), transparent)" : "linear-gradient(to top, rgba(248,250,252,0.6), transparent)",
        }} />
      </div>

      {/* ── Navbar ── */}
      <nav className={`relative z-10 px-6 py-4 flex items-center justify-between border-b backdrop-blur-md transition-colors duration-300 ${dark ? "border-zinc-800/40 bg-[#0a0a0f]/60" : "border-zinc-200/60 bg-white/60"}`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-violet-500/30">
            CT
          </div>
          <span className="font-semibold tracking-tight">CareerTrack</span>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setDark(!dark)} title="Toggle dark mode"
            className={`w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all duration-200 border ${
              dark ? "bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700 text-yellow-400" : "bg-white/80 border-zinc-200 hover:bg-zinc-100 text-zinc-600"
            }`}>
            {dark ? "☀️" : "🌙"}
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className={`text-sm px-3 py-1.5 rounded-lg transition-colors font-medium border ${
                dark ? "text-zinc-300 hover:text-white border-zinc-700 hover:border-zinc-500 bg-zinc-800/50" : "text-zinc-600 hover:text-zinc-900 border-zinc-200 bg-white/70 hover:bg-zinc-100"
              }`}>Sign In</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-1.5 rounded-lg transition-all font-medium shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105">
                Get Started
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <Link href="/dashboard" className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-1.5 rounded-lg transition-all font-medium hover:scale-105">
              Dashboard →
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center py-24">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium backdrop-blur-sm bg-violet-500/10 border-violet-500/25 text-violet-400">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          Real-time job tracking · Powered by Firebase
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight tracking-tight">
          Track every{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              application
            </span>
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-violet-500/0 via-violet-500/60 to-violet-500/0" />
          </span>
          {" "}in one place
        </h1>

        <p className={`mt-6 text-lg max-w-xl leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
          Never lose track of where you applied. CareerTrack gives you a
          real-time dashboard to manage your entire job search effortlessly.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center">
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="group px-7 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl transition-all text-sm shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 flex items-center gap-2">
                Start Tracking Free
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className={`px-7 py-3 font-medium rounded-xl transition-all text-sm border hover:scale-105 ${
                dark ? "bg-zinc-800/80 hover:bg-zinc-700 text-white border-zinc-700" : "bg-white/80 hover:bg-zinc-100 text-zinc-800 border-zinc-200"
              }`}>Sign In</button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="group px-7 py-3 bg-violet-600 hover:bg-violet-500 text-white font-medium rounded-xl transition-all text-sm hover:scale-105 flex items-center gap-2">
              Open Dashboard
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </SignedIn>
        </div>

        {/* Stats row */}
        <div className={`mt-12 flex items-center gap-8 text-sm ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
          {[["🚀", "Free to use"], ["⚡", "Real-time sync"], ["🔒", "Secure & private"]].map(([icon, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <span>{icon}</span><span>{label}</span>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl w-full">
          {[
            { icon: "⚡", title: "Real-time Sync",  desc: "Firebase Realtime DB — updates across all your devices instantly", color: "from-yellow-500/10 to-orange-500/5",  border: "hover:border-yellow-500/30" },
            { icon: "🔒", title: "Secure Auth",      desc: "Clerk authentication with Google, GitHub, or email sign-in",      color: "from-violet-500/10 to-purple-500/5",  border: "hover:border-violet-500/30" },
            { icon: "📊", title: "Smart Dashboard",  desc: "Track stats, pipeline stages, and weekly application goals",       color: "from-blue-500/10 to-indigo-500/5",    border: "hover:border-blue-500/30"  },
          ].map((f) => (
            <div key={f.title}
              className={`rounded-2xl p-6 text-left border transition-all duration-300 backdrop-blur-sm hover:-translate-y-1 hover:shadow-xl ${f.border} ${
                dark ? `bg-gradient-to-br ${f.color} border-zinc-800 hover:shadow-zinc-900` : `bg-gradient-to-br ${f.color} border-zinc-200/80 hover:shadow-zinc-200`
              }`}>
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
              <p className={`text-xs leading-relaxed ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}