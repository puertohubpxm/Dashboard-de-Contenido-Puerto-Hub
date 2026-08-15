"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, Copy, Check, Eye, ArrowRight, BookmarkPlus } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Hook, HookType } from "@/data/mock";
import { getHookBank } from "@/lib/content-store";
import { formatCompactNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const platformStyles: Record<Hook["platform"], string> = {
  Instagram: "text-primary",
  TikTok: "text-foreground",
  "YouTube Shorts": "text-destructive",
};

type SortKey = "views" | "recent";

function HookCard({ hook, fromBank }: { hook: Hook; fromBank: boolean }) {
  const [copied, setCopied] = useState(false);

  return (
    <Card className="flex flex-col">
      <CardHeader className="gap-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="secondary">{hook.hookType}</Badge>
            <Badge variant="outline">{hook.niche}</Badge>
            {fromBank && (
              <Badge variant="default" className="gap-1">
                <BookmarkPlus className="size-3" />
                Del banco
              </Badge>
            )}
          </div>
          <span className={cn("text-xs font-medium", platformStyles[hook.platform])}>
            {hook.platform}
          </span>
        </div>
        <p className="text-sm font-semibold leading-snug text-foreground">
          &ldquo;{hook.hook}&rdquo;
        </p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        <div className="rounded-md bg-muted/60 px-3 py-2">
          <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            Plantilla
          </p>
          <p className="font-mono text-xs italic leading-relaxed text-foreground">
            {hook.template}
          </p>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {hook.transcript}
        </p>
        <div className="mt-auto flex flex-col gap-3 pt-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Por <span className="text-foreground">{hook.creator.name}</span> ·{" "}
              {hook.creator.handle}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="size-3.5" />
              {formatCompactNumber(hook.views)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                navigator.clipboard?.writeText(hook.hook);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            </Button>
            <Button asChild size="sm" className="flex-1">
              <Link href={`/script?hook=${hook.id}`}>
                Usa este hook
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function HooksLibrary({
  hooks,
  niches,
  hookTypes,
}: {
  hooks: Hook[];
  niches: string[];
  hookTypes: HookType[];
}) {
  const [bank, setBank] = useState<Hook[]>([]);
  const [query, setQuery] = useState("");
  const [niche, setNiche] = useState<string>("all");
  const [activeType, setActiveType] = useState<HookType | null>(null);
  const [sort, setSort] = useState<SortKey>("views");

  useEffect(() => {
    // Sincroniza con localStorage tras el montaje para evitar un mismatch de
    // hidratación (el servidor no tiene acceso al banco de hooks guardado).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBank(getHookBank());
  }, []);

  const allHooks = useMemo(() => [...bank, ...hooks], [bank, hooks]);
  const bankIds = useMemo(() => new Set(bank.map((h) => h.id)), [bank]);

  const filtered = useMemo(() => {
    const result = allHooks.filter((h) => {
      const matchesQuery =
        query.trim().length === 0 ||
        h.hook.toLowerCase().includes(query.toLowerCase()) ||
        h.transcript.toLowerCase().includes(query.toLowerCase()) ||
        h.template.toLowerCase().includes(query.toLowerCase());
      const matchesNiche = niche === "all" || h.niche === niche;
      const matchesType = !activeType || h.hookType === activeType;
      return matchesQuery && matchesNiche && matchesType;
    });

    return result.sort((a, b) =>
      sort === "views" ? b.views - a.views : b.savedAt.localeCompare(a.savedAt)
    );
  }, [allHooks, query, niche, activeType, sort]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por texto del hook, plantilla o transcripción..."
            className="pl-9"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={niche} onValueChange={setNiche}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Nicho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los nichos</SelectItem>
              {niches.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="views">Más vistas</SelectItem>
              <SelectItem value="recent">Más recientes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveType(null)}
          className={cn(
            "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
            activeType === null
              ? "border-primary bg-primary/15 text-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          Todos los tipos ({allHooks.length})
        </button>
        {hookTypes.map((type) => {
          const count = allHooks.filter((h) => h.hookType === type).length;
          if (count === 0) return null;
          return (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                activeType === type
                  ? "border-primary bg-primary/15 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {type} ({count})
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No se encontraron hooks con esos filtros.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((hook) => (
            <HookCard key={hook.id} hook={hook} fromBank={bankIds.has(hook.id)} />
          ))}
        </div>
      )}
    </div>
  );
}
