"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface Props {
  data: { month: string; count: number }[];
}

export function ApplicationsBarChart({ data }: Props) {
  return (
    <Card className="transition-all duration-500 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Monthly Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}