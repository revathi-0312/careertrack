import { KpiCard } from "@/components/dashboard/KpiCard";
import { ApplicationsBarChart } from "@/components/dashboard/ApplicationsBarChart";
import { StatusPieChart } from "@/components/dashboard/StatusPieChart";
import { ApplicationsTable } from "@/components/dashboard/ApplicationsTable";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowLeft, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/BackButton";
import { recentApplications} from "@/lib/mock-data";


export default function DashboardPage() {
    

    return (
        <div className=
            "space-y-6 p-6 bg-gradient-to-br from-purple-300 via-background to-pink-500 dark:from-cyan-900 dark:via-background dark:to-blue-800 min-h-screen">
            {/*ThemeToggle}*/}
            <div className="absolute top-6 right-6">
                <ThemeToggle />
            </div>
            <div className="absolute top-6 left-6">
                <BackButton/>
            </div>
            <div className="text-center">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Track your job applications and career growth</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 mt-10">
                <KpiCard title="Total Applications" value={24} />
                <KpiCard title="Interviews Scheduled" value={6} />
                <KpiCard title="Offers Received" value={2} />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <ApplicationsBarChart />
                <StatusPieChart />
            </div>
            <ApplicationsTable />
        </div>
        
    )
}