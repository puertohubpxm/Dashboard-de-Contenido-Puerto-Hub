"use client";

import { useMemo, useState } from "react";
import { Search, Copy, Check, Eye } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import type { Hook } from "@/data/mock";
import { formatCompactNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const platformStyles: Record<Hook["platform"], string> = {
  Instagram: "text-primary",
  TikTok: "text-foreground",
  YouTube: "text-destructive",
};

function HookCard({ hook }: { hook: Hook }) {
  const [copied, setCopied] = useState(false);

  return (
    <Card className="flex flex-col">
      <CardHeader className="gap-2">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">{hook.template}</Badge>
          <span className={cn("text-xs font-medium", platformStyles[hook.platform])}>
            {hook.platform}
          </span>
        </div>
        <p className="text-sm font-semibold leading-snug text-foreground">
          &ldquo;{hook.hook}&rdquo;
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
          {hook.transcript}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="size-3.5" />
            {formatCompactNumber(hook.views)} · {hook.niche}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              navigator.clipboard?.writeText(hook.hook);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            }}
          >
            {copied ? (
              <Check className="size-3.5" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied ? "Copiado" : "Copiar"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function HooksLibrary({
  hooks,
  templates,
}: {
  hooks: Hook[];
  templates: { template: string; count: number }[];
}) {
  const [query, setQuery] = useState("");
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return hooks.filter((h) => {
      const matchesQuery =
        query.trim().length === 0 ||
        h.hook.toLowerCase().includes(query.toLowerCase()) ||
        h.transcript.toLowerCase().includes(query.toLowerCase());
      const matchesTemplate = !activeTemplate || h.template === activeTemplate;
      return matchesQuery && matchesTemplate;
    });
  }, [hooks, query, activeTemplate]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por texto del hook o transcripción..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTemplate(null)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            activeTemplate === null
              ? "border-primary bg-primary/15 text-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          Todas ({hooks.length})
        </button>
        {templates.map((t) => (
          <button
            key={t.template}
            onClick={() => setActiveTemplate(t.template)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              activeTemplate === t.template
                ? "border-primary bg-primary/15 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {t.template} ({t.count})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No se encontraron hooks con esos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((hook) => (
            <HookCard key={hook.id} hook={hook} />
          ))}
        </div>
      )}
    </div>
  );
}
