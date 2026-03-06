// scripts/seed.mjs
// Run with: node scripts/seed.mjs
//
// This script adds sample job applications to your Firebase Realtime Database.
// Make sure your .env.local is filled in before running.

import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { readFileSync } from "fs";

// Load .env.local manually
const envFile = readFileSync(".env.local", "utf-8");
envFile.split("\n").forEach((line) => {
  const [key, ...rest] = line.split("=");
  if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
});

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// ── IMPORTANT: Replace this with YOUR Clerk user ID ──────────────────────────
// Find it in: Clerk Dashboard → Users → click your user → copy the "User ID"
// It looks like: user_2abc123xyz...
const YOUR_CLERK_USER_ID = "PASTE_YOUR_CLERK_USER_ID_HERE";
// ─────────────────────────────────────────────────────────────────────────────

if (YOUR_CLERK_USER_ID === "user_3AQnxVJ7vI44sq3nPrQlE8OmSXi") {
  console.error("❌ Please set YOUR_CLERK_USER_ID in scripts/seed.mjs first!");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const sampleJobs = [
  {
    company: "Google",
    role: "Software Engineer II",
    location: "Mountain View, CA",
    salary: "$180k - $220k",
    status: "interview",
    appliedDate: daysAgo(2),
    notes: "Referred by a friend on the Chrome team. Technical phone screen done.",
    url: "https://careers.google.com",
    createdAt: new Date().toISOString(),
  },
  {
    company: "Stripe",
    role: "Frontend Engineer",
    location: "Remote",
    salary: "$160k - $200k",
    status: "applied",
    appliedDate: daysAgo(5),
    notes: "Applied through their careers page. Strong interest in payments infra.",
    url: "https://stripe.com/jobs",
    createdAt: new Date().toISOString(),
  },
  {
    company: "Vercel",
    role: "Developer Advocate",
    location: "Remote",
    salary: "$140k - $170k",
    status: "offer",
    appliedDate: daysAgo(14),
    notes: "Received offer! Evaluating compensation package.",
    url: "https://vercel.com/careers",
    createdAt: new Date().toISOString(),
  },
  {
    company: "Airbnb",
    role: "Senior React Developer",
    location: "San Francisco, CA",
    salary: "$170k - $210k",
    status: "rejected",
    appliedDate: daysAgo(20),
    notes: "Rejected after final round. Feedback: needed more system design experience.",
    url: "https://careers.airbnb.com",
    createdAt: new Date().toISOString(),
  },
  {
    company: "Notion",
    role: "Full Stack Engineer",
    location: "Remote",
    salary: "$150k - $185k",
    status: "applied",
    appliedDate: daysAgo(1),
    notes: "Applied via LinkedIn. Love their product.",
    url: "https://notion.so/careers",
    createdAt: new Date().toISOString(),
  },
  {
    company: "Linear",
    role: "Product Engineer",
    location: "Remote",
    salary: "$145k - $175k",
    status: "saved",
    appliedDate: daysAgo(0),
    notes: "Dream company. Haven't applied yet — polishing portfolio first.",
    url: "https://linear.app/careers",
    createdAt: new Date().toISOString(),
  },
];

function daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split("T")[0];
}

async function seed() {
  console.log("🌱 Seeding Firebase with sample jobs...");
  console.log(`📍 User ID: ${YOUR_CLERK_USER_ID}\n`);

  const jobsRef = ref(db, `users/${YOUR_CLERK_USER_ID}/jobs`);

  for (const job of sampleJobs) {
    await push(jobsRef, job);
    console.log(`✅ Added: ${job.role} @ ${job.company} [${job.status}]`);
  }

  console.log("\n🎉 Done! Open your dashboard — it should now show 6 sample jobs.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
