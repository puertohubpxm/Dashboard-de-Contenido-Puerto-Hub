"use client";

import { useMemo, useState } from "react";
import { Sparkles, Send, Aperture, Music2, PlaySquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { Hook, ScheduledPost } from "@/data/mock";
import { cn } from "@/lib/utils";

const platformOptions: {
  key: ScheduledPost["platforms"][number];
  label: string;
  icon: typeof Aperture;
}[] = [
  { key: "Instagram", label: "Instagram", icon: Aperture },
  { key: "TikTok", label: "TikTok", icon: Music2 },
  { key: "YouTube", label: "YouTube", icon: PlaySquare },
];

const ctaByNiche: Record<string, string> = {
  Negocios: "Guarda esto antes de tomar tu próxima decisión de negocio.",
  Educación: "Guárdalo para cuando lo necesites.",
  Marketing: "Aplica esto en tu próxima publicación.",
  Creador: "Guarda este post, te va a servir esta semana.",
  Contenido: "Comparte esto con alguien que también crea contenido.",
};

function generateCaption(hook: Hook) {
  const cta = ctaByNiche[hook.niche] ?? "Guarda este post para después.";
  const hashtag = `#${hook.niche.toLowerCase().replace(/\s+/g, "")}`;
  return `${hook.hook}\n\n${cta}\n\n${hashtag} #contenido #creadores`;
}

export function SchedulerComposer({
  hooks,
  onSchedule,
}: {
  hooks: Hook[];
  onSchedule: (post: ScheduledPost) => void;
}) {
  const [selectedHookId, setSelectedHookId] = useState(hooks[0]?.id ?? "");
  const [caption, setCaption] = useState("");
  const [platforms, setPlatforms] = useState<Set<ScheduledPost["platforms"][number]>>(
    new Set(["Instagram"])
  );

  const selectedHook = useMemo(
    () => hooks.find((h) => h.id === selectedHookId) ?? hooks[0],
    [hooks, selectedHookId]
  );

  function togglePlatform(key: ScheduledPost["platforms"][number]) {
    setPlatforms((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function handleSchedule() {
    if (!selectedHook || platforms.size === 0) return;
    onSchedule({
      id: `s-${Date.now()}`,
      caption: caption.trim().length > 0 ? caption : generateCaption(selectedHook),
      hookUsed: selectedHook.template,
      platforms: Array.from(platforms),
      status: "Programado",
      scheduledAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    });
    setCaption("");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nueva publicación</CardTitle>
        <CardDescription>
          Elige un hook, genera el caption automáticamente y programa en un clic
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Hook base</Label>
          <Select value={selectedHookId} onValueChange={setSelectedHookId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecciona un hook" />
            </SelectTrigger>
            <SelectContent>
              {hooks.map((h) => (
                <SelectItem key={h.id} value={h.id}>
                  {h.hook}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <Label>Caption</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => selectedHook && setCaption(generateCaption(selectedHook))}
            >
              <Sparkles className="size-3.5" />
              Generar automáticamente
            </Button>
          </div>
          <Textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Escribe o genera un caption a partir del hook seleccionado..."
            className="min-h-24"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Plataformas</Label>
          <div className="flex flex-wrap gap-2">
            {platformOptions.map((p) => {
              const active = platforms.has(p.key);
              return (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => togglePlatform(p.key)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors",
                    active
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground"
                  )}
                >
                  <p.icon className="size-3.5" />
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>

        <Button
          onClick={handleSchedule}
          disabled={platforms.size === 0}
          className="w-fit"
        >
          <Send className="size-3.5" />
          Programar con un clic
        </Button>
      </CardContent>
    </Card>
  );
}
