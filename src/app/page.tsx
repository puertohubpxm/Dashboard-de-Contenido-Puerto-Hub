import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Eye,
  Bookmark,
  UserPlus,
} from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { navItems } from "@/lib/nav";
import { analyticsSummary, trends } from "@/data/mock";
import { formatCompactNumber } from "@/lib/format";

export default function Home() {
  const topTrend = [...trends].sort((a, b) => b.hookPotential - a.hookPotential)[0];

  return (
    <>
      <PageHeader
        icon={BarChart3}
        title="Hola, @puertohub.pxm"
        description="Este es el estado de tu contenido esta semana."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Eye}
          label="Vistas (7 días)"
          value={formatCompactNumber(analyticsSummary.views.value)}
          delta={analyticsSummary.views.delta}
        />
        <StatCard
          icon={Bookmark}
          label="Guardados (7 días)"
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
          icon={BarChart3}
          label="Retención promedio"
          value={String(analyticsSummary.avgWatchRate.value)}
          suffix="%"
          delta={analyticsSummary.avgWatchRate.delta}
        />
      </div>

      <Card className="border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card">
        <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <Badge variant="default" className="w-fit">
              Tendencia con mayor potencial
            </Badge>
            <p className="text-sm font-medium text-foreground">{topTrend.title}</p>
            <p className="text-xs text-muted-foreground">{topTrend.summary}</p>
          </div>
          <Link
            href="/trends"
            className="flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Ver tendencias
            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">Accesos rápidos</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card className="h-full transition-colors hover:border-primary/50 hover:bg-accent/40">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <item.icon className="size-4.5" />
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </div>
                  <CardTitle className="pt-2 text-sm">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
