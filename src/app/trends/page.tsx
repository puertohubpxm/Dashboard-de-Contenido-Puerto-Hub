import { Sparkles } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { trends, trendSources, type SourceType } from "@/data/mock";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Tendencias · Puerto Hub",
};

const sourceTypes: SourceType[] = ["Newsletter", "Cuenta", "Comunidad"];
const sourceTypeLabels: Record<SourceType, string> = {
  Newsletter: "Newsletters",
  Cuenta: "Cuentas",
  Comunidad: "Comunidades",
};

function potentialTier(score: number) {
  if (score >= 8)
    return { label: "Alto", className: "text-success", barClassName: "bg-success" };
  if (score >= 5)
    return { label: "Medio", className: "text-warning", barClassName: "bg-warning" };
  return {
    label: "Bajo",
    className: "text-muted-foreground",
    barClassName: "bg-muted-foreground",
  };
}

export default function TrendsPage() {
  const sorted = [...trends].sort((a, b) => b.potential - a.potential);

  return (
    <>
      <PageHeader
        icon={Sparkles}
        title="Tendencias"
        description="Cada mañana se rastrean 12 fuentes de tu nicho y se extraen los temas que más se repiten en las últimas 48 horas"
      />

      <Card>
        <CardContent className="flex flex-col gap-3 p-5">
          {sourceTypes.map((type) => (
            <div key={type} className="flex flex-wrap items-center gap-2">
              <span className="w-24 shrink-0 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {sourceTypeLabels[type]}
              </span>
              {trendSources
                .filter((s) => s.type === type)
                .map((s) => (
                  <Badge key={s.name} variant="outline">
                    {s.name}
                  </Badge>
                ))}
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        {sorted.map((trend) => {
          const tier = potentialTier(trend.potential);
          return (
            <Card key={trend.id}>
              <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      Detectado {formatDate(trend.detectedAt)}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{trend.title}</p>
                  <p className="text-xs text-muted-foreground">{trend.summary}</p>
                  <p className="text-xs italic text-muted-foreground">
                    {trend.justification}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] text-muted-foreground">
                      Mencionado por {trend.mentionedBy.length}/12:
                    </span>
                    {trend.mentionedBy.map((source) => (
                      <Badge key={source} variant="secondary" className="text-[11px]">
                        {source}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex w-full flex-col gap-1.5 sm:w-40">
                  <div className="flex items-center justify-between text-xs">
                    <span className={cn("font-medium", tier.className)}>
                      Potencial {tier.label}
                    </span>
                    <span className="font-semibold text-foreground">
                      {trend.potential}/10
                    </span>
                  </div>
                  <Progress
                    value={trend.potential * 10}
                    indicatorClassName={tier.barClassName}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
