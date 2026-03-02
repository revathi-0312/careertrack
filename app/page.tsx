import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function HomePage() {
  return (
 <div
      className="relative min-h-screen flex flex-col
      bg-gradient-to-br
      from-purple-300
      via-background
      to-pink-500
      dark:from-cyan-900
      dark:via-background
      dark:to-blue-800"
    >
      {/* ThemeToggle*/}
       <div className="absolute top-6 right-6">
       <ThemeToggle />
       </div>
      
     {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center text-center px-6">
        <div className="backdrop-blur-md bg-background/60 p-10 rounded-">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            CareerTrack
          </h1>

          <p className="text-muted-foreground text-lg mb-8">
            A simple analytics dashboard to track job applications,
            monitor progress, and visualize career growth.
          </p>

          <Link href="/dashboard">
            <Button size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-muted/40">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          
          <Card>
            <CardHeader>
              <CardTitle>Track Applications</CardTitle>
            </CardHeader>
            <CardContent>
              Manage and monitor all your job applications in one place.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visual Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              View monthly trends and status distribution using charts.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modern UI</CardTitle>
            </CardHeader>
            <CardContent>
              Built with Next.js and shadcn/ui for clean and responsive design.
            </CardContent>
          </Card>

        </div>
      </section>
    </div>
  )
}
