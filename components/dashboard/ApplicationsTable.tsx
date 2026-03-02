import { Table,TableBody,TableHead,TableHeader,TableRow,TableCell } from "../ui/table";
import { Card,CardHeader,CardContent,CardTitle} from "@/components/ui/card";
import { recentApplications } from "@/lib/mock-data";
import { Badge } from "../ui/badge";

export function ApplicationsTable() {
    return (
        <Card className="transition-all duration-500 hover:shadow-xl">
            <CardHeader>
                <CardTitle className="text-sm font-medium">Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Applicant</TableHead>
                            <TableHead>Position</TableHead>
                            <TableHead>Date Applied</TableHead> 
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentApplications.map((app, index) => (
                            <TableRow key={index}>
                                <TableCell>{app.company}</TableCell>
                                <TableCell>{app.role}</TableCell>
                                <TableCell>{app.status}</TableCell>
                                <TableCell> 
                                    <Badge>
                                        {app.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>  
        </Card>
    )
}