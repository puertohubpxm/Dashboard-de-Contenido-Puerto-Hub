"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { rangeLabels, type RangeKey, type TrendPoint } from "@/data/mock";
import { formatCompactNumber } from "@/lib/format";

const metrics = [
  { key: "views", label: "Vistas", color: "var(--color-chart-1)" },
  { key: "saves", label: "Guardados", color: "var(--color-chart-2)" },
  { key: "followers", label: "Nuevos seguidores", color: "var(--color-chart-3)" },
  { key: "dms", label: "DMs", color: "var(--color-chart-4)" },
] as const;

type MetricKey = (typeof metrics)[number]["key"];
const rangeKeys: RangeKey[] = ["7d", "30d", "90d"];

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-medium text-popover-foreground">{label}</p>
      <p className="text-muted-foreground">{formatCompactNumber(payload[0].value)}</p>
    </div>
  );
}

export function PerformanceChart({ ranges }: { ranges: Record<RangeKey, TrendPoint[]> }) {
  const [metric, setMetric] = useState<MetricKey>("views");
  const [range, setRange] = useState<RangeKey>("7d");
  const active = metrics.find((m) => m.key === metric)!;
  const data = ranges[range];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs value={metric} onValueChange={(v) => setMetric(v as MetricKey)}>
          <TabsList>
            {metrics.map((m) => (
              <TabsTrigger key={m.key} value={m.key}>
                {m.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <Tabs value={range} onValueChange={(v) => setRange(v as RangeKey)}>
          <TabsList>
            {rangeKeys.map((r) => (
              <TabsTrigger key={r} value={r}>
                {rangeLabels[r]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: -20, right: 10, top: 10 }}>
            <defs>
              <linearGradient id="performanceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={active.color} stopOpacity={0.35} />
                <stop offset="100%" stopColor={active.color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--color-border)"
            />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => formatCompactNumber(Number(v))}
              tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
              width={40}
            />
            <Tooltip content={<ChartTooltip />} />
            <Area
              type="monotone"
              dataKey={metric}
              stroke={active.color}
              strokeWidth={2}
              fill="url(#performanceFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
