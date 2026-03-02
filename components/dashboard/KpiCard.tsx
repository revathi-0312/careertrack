import { Card,CardHeader,CardTitle ,CardContent} from "../ui/card";

interface KpiCardProps {
  title: string;
  value: string | number;
  description?: string;
}

export function KpiCard({ title, value, description }: KpiCardProps) {
    return (
        <Card className="transition-all duration-500 hover:shadow-xl">

            <CardHeader>
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>   
            <CardContent>
                <p className="text-2xl font-semibold">{value}</p>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </CardContent>
        </Card>
    )
}