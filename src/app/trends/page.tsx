import { Sparkles } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { trends, trendSources } from "@/data/mock";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Tendencias · Puerto Hub",
};

function potentialTier(score: number) {
  if (score >= 85)
    return { label: "Alto", className: "text-success", barClassName: "bg-success" };
  if (score >= 60)
    return { label: "Medio", className: "text-warning", barClassName: "bg-warning" };
  return {
    label: "Bajo",
    className: "text-muted-foreground",
    barClassName: "bg-muted-foreground",
  };
}

export default function TrendsPage() {
  const sorted = [...trends].sort((a, b) => b.hookPotential - a.hookPotential);

  return (
    <>
      <PageHeader
        icon={Sparkles}
        title="Tendencias"
        description={`Noticias sobre IA de ${trendSources.length} fuentes, clasificadas según su potencial para crear hooks`}
      />

      <Card>
        <CardContent className="flex flex-wrap gap-2 p-5">
          {trendSources.map((source) => (
            <Badge key={source} variant="outline">
              {source}
            </Badge>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        {sorted.map((trend) => {
          const tier = potentialTier(trend.hookPotential);
          return (
            <Card key={trend.id}>
              <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{trend.source}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(trend.publishedAt)}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">
                    {trend.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{trend.summary}</p>
                </div>

                <div className="flex w-full flex-col gap-1.5 sm:w-40">
                  <div className="flex items-center justify-between text-xs">
                    <span className={cn("font-medium", tier.className)}>
                      Potencial {tier.label}
                    </span>
                    <span className="font-semibold text-foreground">
                      {trend.hookPotential}
                    </span>
                  </div>
                  <Progress
                    value={trend.hookPotential}
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
