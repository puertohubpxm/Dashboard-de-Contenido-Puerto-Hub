import { BarChart3, Eye, Bookmark, UserPlus, Gauge } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { WeeklyChart } from "@/components/dashboard/weekly-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  analyticsSummary,
  topContentThisWeek,
  weeklyPerformance,
} from "@/data/mock";
import { formatCompactNumber, formatDate } from "@/lib/format";

export const metadata = {
  title: "Analíticas · Puerto Hub",
};

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        icon={BarChart3}
        title="Analíticas"
        description="Vistas de Instagram, guardados, nuevos seguidores y el contenido con mejor rendimiento de la semana"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Eye}
          label="Vistas totales"
          value={formatCompactNumber(analyticsSummary.views.value)}
          delta={analyticsSummary.views.delta}
        />
        <StatCard
          icon={Bookmark}
          label="Guardados"
          value={formatCompactNumber(analyticsSummary.saves.value)}
          delta={analyticsSummary.saves.delta}
        />
        <StatCard
          icon={UserPlus}
          label="Nuevos seguidores"
          value={formatCompactNumber(analyticsSummary.newFollowers.value)}
          delta={analyticsSummary.newFollowers.delta}
        />
        <StatCard
          icon={Gauge}
          label="Retención promedio"
          value={String(analyticsSummary.avgWatchRate.value)}
          suffix="%"
          delta={analyticsSummary.avgWatchRate.delta}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rendimiento semanal</CardTitle>
          <CardDescription>Instagram · últimos 7 días</CardDescription>
        </CardHeader>
        <CardContent>
          <WeeklyChart data={weeklyPerformance} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top contenido de la semana</CardTitle>
          <CardDescription>Ordenado por vistas totales</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-5 sm:pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contenido</TableHead>
                <TableHead>Formato</TableHead>
                <TableHead>Publicado</TableHead>
                <TableHead className="text-right">Vistas</TableHead>
                <TableHead className="text-right">Guardados</TableHead>
                <TableHead className="text-right">Compartidos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topContentThisWeek.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="max-w-70 whitespace-normal font-medium text-foreground">
                    {item.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.format}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(item.publishedAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCompactNumber(item.views)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCompactNumber(item.saves)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCompactNumber(item.shares)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
