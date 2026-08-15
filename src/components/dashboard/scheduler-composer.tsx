"use client";

import { useEffect, useRef, useState } from "react";
import { Aperture, Music2, PlaySquare, UploadCloud, Send, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { CaptionVariant, Hook, Platform, PlatformTarget, ScheduledPost } from "@/data/mock";
import { captionVariants } from "@/data/mock";
import { generateCaptionVariants } from "@/lib/captions";
import { getScriptDraft, clearScriptDraft } from "@/lib/content-store";
import { cn } from "@/lib/utils";

const platformOptions: { key: Platform; label: string; icon: typeof Aperture }[] = [
  { key: "Instagram", label: "Instagram", icon: Aperture },
  { key: "TikTok", label: "TikTok", icon: Music2 },
  { key: "YouTube Shorts", label: "YouTube Shorts", icon: PlaySquare },
];

function defaultDateTime() {
  const d = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const date = d.toISOString().slice(0, 10);
  const time = `${String(d.getHours()).padStart(2, "0")}:00`;
  return { date, time };
}

type TargetDraft = { enabled: boolean; date: string; time: string };

export function SchedulerComposer({
  hooks,
  onSchedule,
}: {
  hooks: Hook[];
  onSchedule: (post: ScheduledPost) => void;
}) {
  const [selectedHookId, setSelectedHookId] = useState(hooks[0]?.id ?? "");
  const [hookText, setHookText] = useState(hooks[0]?.hook ?? "");
  const [niche, setNiche] = useState<string | undefined>(hooks[0]?.niche);

  const [videoName, setVideoName] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [variants, setVariants] = useState<Record<CaptionVariant, string> | null>(null);
  const [activeVariant, setActiveVariant] = useState<CaptionVariant>("Directo");

  const [targets, setTargets] = useState<Record<Platform, TargetDraft>>(() => {
    const base = defaultDateTime();
    return {
      Instagram: { enabled: true, ...base },
      TikTok: { enabled: false, ...base },
      "YouTube Shorts": { enabled: false, ...base },
    };
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  function runUpload(name: string, hook: string, forNiche?: string) {
    setVideoName(name);
    setVariants(null);
    setIsGenerating(true);
    setTimeout(() => {
      setVariants(generateCaptionVariants(hook, forNiche));
      setActiveVariant("Directo");
      setIsGenerating(false);
    }, 600);
  }

  useEffect(() => {
    // Sincroniza con el borrador de /script (localStorage) tras el montaje —
    // no existe en el servidor, así que no se puede leer durante el render inicial.
    const draft = getScriptDraft();
    if (draft.hook.trim().length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHookText(draft.hook);
      setNiche(draft.niche);
      const match = hooks.find((h) => h.id === draft.hookId);
      if (match) setSelectedHookId(match.id);
      runUpload("guion-desde-script.mp4", draft.hook, draft.niche);
      clearScriptDraft();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleHookChange(id: string) {
    const hook = hooks.find((h) => h.id === id);
    if (!hook) return;
    setSelectedHookId(id);
    setHookText(hook.hook);
    setNiche(hook.niche);
    setVideoName(null);
    setVariants(null);
  }

  function handleFileSelected(file: File) {
    runUpload(file.name, hookText, niche);
  }

  function toggleTarget(platform: Platform) {
    setTargets((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], enabled: !prev[platform].enabled },
    }));
  }

  function updateTarget(platform: Platform, field: "date" | "time", value: string) {
    setTargets((prev) => ({
      ...prev,
      [platform]: { ...prev[platform], [field]: value },
    }));
  }

  const enabledPlatforms = platformOptions.filter((p) => targets[p.key].enabled);
  const canSchedule =
    variants !== null &&
    enabledPlatforms.length > 0 &&
    enabledPlatforms.every((p) => targets[p.key].date && targets[p.key].time);

  function handleSchedule() {
    if (!variants || !canSchedule) return;
    const newTargets: PlatformTarget[] = enabledPlatforms.map((p) => ({
      platform: p.key,
      scheduledAt: `${targets[p.key].date}T${targets[p.key].time}:00`,
      status: "Programado",
    }));

    onSchedule({
      id: `s-${Date.now()}`,
      hookUsed: hookText,
      captions: variants,
      activeVariant,
      targets: newTargets,
    });

    setVideoName(null);
    setVariants(null);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nueva publicación</CardTitle>
        <CardDescription>
          Sube el video para generar 3 variantes de caption y programa por plataforma
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Hook / guion base</Label>
          <Select value={selectedHookId} onValueChange={handleHookChange}>
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
          {hookText && hookText !== hooks.find((h) => h.id === selectedHookId)?.hook && (
            <p className="text-xs italic text-muted-foreground">
              Hook activo (desde /script): &ldquo;{hookText}&rdquo;
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label>Video</Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelected(file);
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-1.5 rounded-md border border-dashed border-border px-4 py-5 text-center text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <UploadCloud className="size-5" />
            {videoName ? (
              <span className="font-medium text-foreground">{videoName}</span>
            ) : (
              <span>Sube un video para generar los captions automáticamente</span>
            )}
          </button>
        </div>

        {isGenerating && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" />
            Generando 3 variantes de caption...
          </div>
        )}

        {variants && (
          <div className="flex flex-col gap-1.5">
            <Label>Caption generado</Label>
            <Tabs
              value={activeVariant}
              onValueChange={(v) => setActiveVariant(v as CaptionVariant)}
            >
              <TabsList>
                {captionVariants.map((v) => (
                  <TabsTrigger key={v} value={v}>
                    {v}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <Textarea
              value={variants[activeVariant]}
              onChange={(e) =>
                setVariants((prev) =>
                  prev ? { ...prev, [activeVariant]: e.target.value } : prev
                )
              }
              className="min-h-28"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <Label>Plataformas y horario</Label>
          {platformOptions.map((p) => {
            const target = targets[p.key];
            return (
              <div
                key={p.key}
                className={cn(
                  "flex flex-col gap-2 rounded-md border px-3 py-2.5 transition-colors sm:flex-row sm:items-center sm:justify-between",
                  target.enabled
                    ? "border-primary/40 bg-primary/5"
                    : "border-border"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleTarget(p.key)}
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-medium",
                    target.enabled ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <p.icon className="size-3.5" />
                  {p.label}
                </button>
                {target.enabled && (
                  <div className="flex items-center gap-2">
                    <Input
                      type="date"
                      value={target.date}
                      onChange={(e) => updateTarget(p.key, "date", e.target.value)}
                      className="h-8 w-36 text-xs"
                    />
                    <Input
                      type="time"
                      value={target.time}
                      onChange={(e) => updateTarget(p.key, "time", e.target.value)}
                      className="h-8 w-24 text-xs"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <Button onClick={handleSchedule} disabled={!canSchedule} className="w-fit">
          <Send className="size-3.5" />
          Programar publicación
        </Button>
      </CardContent>
    </Card>
  );
}
