import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
  suffix,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: number;
  suffix?: string;
}) {
  const isPositive = (delta ?? 0) >= 0;

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">{label}</span>
          <div className="flex size-8 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <Icon className="size-4" />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {value}
            {suffix && (
              <span className="ml-0.5 text-base font-medium text-muted-foreground">
                {suffix}
              </span>
            )}
          </span>
          {delta !== undefined && (
            <span
              className={cn(
                "flex items-center gap-0.5 text-xs font-medium",
                isPositive ? "text-success" : "text-destructive"
              )}
            >
              {isPositive ? (
                <ArrowUpRight className="size-3.5" />
              ) : (
                <ArrowDownRight className="size-3.5" />
              )}
              {Math.abs(delta)}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
