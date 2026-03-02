"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import {statusDistribution } from "@/lib/mock-data";

export function StatusPieChart() {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    return (
        <Card className="transition-all duration-500 hover:shadow-xl">
            <CardHeader>
                <CardTitle className="text-sm font-medium">Application Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                             data={statusDistribution}
                             dataKey="value"
                             nameKey="name"
                             innerRadius={70}
                             outerRadius={100}
                             label={({ name }) => name}
                             isAnimationActive={true}
                             animationDuration={1000}
                              >
                            {statusDistribution.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip /> 
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
