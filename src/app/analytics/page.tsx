import { BarChart3, Eye, Bookmark, UserPlus, MessageCircle } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  analyticsSummary,
  averageViews30d,
  featuredThreshold,
  isFeatured,
  performanceRanges,
  top5ContentThisWeek,
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
        description="Vistas, guardados, nuevos seguidores y volumen de DMs, con el contenido de mejor rendimiento"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Eye}
          label="Vistas"
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
          icon={MessageCircle}
          label="Volumen de DMs"
          value={formatCompactNumber(analyticsSummary.dms.value)}
          delta={analyticsSummary.dms.delta}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tendencia de rendimiento</CardTitle>
          <CardDescription>Instagram · elige el rango y la métrica</CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceChart ranges={performanceRanges} />
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-sm font-semibold text-foreground">
            Top 5 reels de los últimos 30 días
          </h2>
          <p className="text-xs text-muted-foreground">
            Promedio: {formatCompactNumber(averageViews30d)} vistas · Destacado a partir
            de {formatCompactNumber(featuredThreshold)} (x2 el promedio)
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {top5ContentThisWeek.map((item, index) => (
            <Card key={item.id}>
              <CardContent className="flex flex-col gap-3 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                      {index + 1}
                    </span>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="secondary">{item.format}</Badge>
                    {isFeatured(item.views) && (
                      <Badge variant="success">Contenido destacado</Badge>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="size-3.5" />
                    {formatCompactNumber(item.views)} vistas
                  </span>
                  <span className="flex items-center gap-1">
                    <Bookmark className="size-3.5" />
                    {formatCompactNumber(item.saves)} guardados
                  </span>
                  <span>{formatCompactNumber(item.shares)} compartidos</span>
                  <span>{formatDate(item.publishedAt)}</span>
                </div>

                <p className="rounded-md bg-muted/60 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">Por qué destacó: </span>
                  {item.reason}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
