"use client";

import { BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer} from "recharts";
import { monthlyApplications } from "@/lib/mock-data";
import { Card,CardHeader,CardContent,CardTitle} from "@/components/ui/card";

export function ApplicationsBarChart() {
    return (
        <Card className="transition-all duration-500 hover:shadow-xl">
            <CardHeader>
                <CardTitle className="text-sm font-medium">Monthly Applications</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={monthlyApplications}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}