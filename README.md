# CareerTrack 🚀

A real-time job application tracker built with Next.js, Firebase, and Clerk. Never lose track of where you applied.

![CareerTrack Dashboard](https://via.placeholder.com/1200x630/0a0a0f/7c3aed?text=CareerTrack+Dashboard)

## ✨ Features

- **Real-time sync** — Firebase Realtime Database keeps your data updated across all devices instantly
- **Secure authentication** — Clerk auth with email, Google, and GitHub sign-in
- **Application tracking** — Track jobs across 5 stages: Saved, Applied, Interview, Offer, Rejected
- **Stats dashboard** — Visual pipeline progress, interview conversion rate, and weekly goals
- **Edit & delete** — Full CRUD for all job applications
- **Dark / light mode** — Fully themed with next-themes
- **Responsive design** — Works on desktop and mobile

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 15](https://nextjs.org) | React framework with App Router |
| [Firebase Realtime DB](https://firebase.google.com) | Real-time data storage |
| [Clerk](https://clerk.com) | Authentication & user management |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com) | UI components (Card, Badge, Table, Progress) |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark/light mode |
| [Lucide React](https://lucide.dev) | Icons |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- A [Firebase](https://firebase.google.com) project with Realtime Database enabled
- A [Clerk](https://clerk.com) account

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/careertrack.git
cd careertrack
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 4. Set up Firebase Realtime Database rules

In your Firebase console, set the following rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
careertrack/
├── app/
│   ├── (dashboard)/
│   │   ├── layout.tsx          # Dashboard layout with navbar
│   │   └── dashboard/
│   │       └── page.tsx        # Main dashboard page
│   ├── sign-in/[[...rest]]/
│   │   └── page.tsx            # Sign-in page
│   ├── sign-up/[[...rest]]/
│   │   └── page.tsx            # Sign-up page
│   ├── api/jobs/               # API routes
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
├── components/
│   ├── dashboard/
│   │   ├── ActivityFeed.tsx    # Sidebar with stats & recent activity
│   │   ├── AddJobModal.tsx     # Add new job modal
│   │   ├── EditJobModal.tsx    # Edit job modal
│   │   ├── JobCard.tsx         # Individual job card
│   │   └── StatsCards.tsx      # Stats overview cards
│   └── ui/                     # shadcn/ui components
├── lib/
│   └── firebase.ts             # Firebase initialization
├── types/
│   └── job.ts                  # TypeScript types
└── middleware.ts               # Clerk auth middleware
```

## 🌐 Deployment

### Deploy on Vercel

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add all environment variables from `.env.local`
4. Deploy

### After deployment

- Add your Vercel domain to **Clerk** → Configure → Domains
- Add your Vercel domain to **Firebase** → Authentication → Authorized Domains

## 📝 License

MIT — feel free to use this project for your own job search!

---

Built with ❤️ by [Revathi](https://github.com/yourusername)