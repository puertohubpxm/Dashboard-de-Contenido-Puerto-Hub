"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Check, Save, Send, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getHookById,
  getScriptDraft,
  saveScriptDraft,
  type ScriptDraft,
} from "@/lib/content-store";
import { generateCaptionVariants } from "@/lib/captions";
import { formatCompactNumber } from "@/lib/format";

export function ScriptEditor() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hookId = searchParams.get("hook");

  const [draft, setDraft] = useState<ScriptDraft>({ hook: "", script: "", caption: "" });
  const [source, setSource] = useState<ReturnType<typeof getHookById>>(undefined);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // getHookById lee el banco de hooks en localStorage — no existe en el
    // servidor, así que la sincronización ocurre tras el montaje en cliente.
    if (hookId) {
      const hook = getHookById(hookId);
      if (hook) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSource(hook);
        setDraft({
          hookId: hook.id,
          hook: hook.hook,
          niche: hook.niche,
          script: hook.transcript,
          caption: generateCaptionVariants(hook.hook, hook.niche).Directo,
        });
        return;
      }
    }
    setDraft(getScriptDraft());
  }, [hookId]);

  function handleSave() {
    saveScriptDraft(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function handleSendToScheduler() {
    saveScriptDraft(draft);
    router.push("/scheduler");
  }

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
      <Card>
        <CardHeader>
          <CardTitle>Editor de guion</CardTitle>
          <CardDescription>
            {source
              ? "Hook insertado automáticamente desde la Biblioteca de Hooks"
              : "Escribe el guion desde cero o elige un hook desde la Biblioteca de Hooks"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Hook</Label>
            <Input
              value={draft.hook}
              onChange={(e) => setDraft((d) => ({ ...d, hook: e.target.value }))}
              placeholder="El hook con el que abre el video..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Guion completo</Label>
            <Textarea
              value={draft.script}
              onChange={(e) => setDraft((d) => ({ ...d, script: e.target.value }))}
              placeholder="Desarrollo del guion: hook, cuerpo y cierre..."
              className="min-h-40"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <Label>Caption</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() =>
                  setDraft((d) => ({
                    ...d,
                    caption: generateCaptionVariants(d.hook, d.niche).Directo,
                  }))
                }
              >
                <Sparkles className="size-3.5" />
                Generar automáticamente
              </Button>
            </div>
            <Textarea
              value={draft.caption}
              onChange={(e) => setDraft((d) => ({ ...d, caption: e.target.value }))}
              placeholder="Caption para acompañar la publicación..."
              className="min-h-24"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button variant="outline" onClick={handleSave}>
              {saved ? <Check className="size-3.5" /> : <Save className="size-3.5" />}
              {saved ? "Guardado" : "Guardar borrador"}
            </Button>
            <Button onClick={handleSendToScheduler} disabled={draft.hook.trim().length === 0}>
              <Send className="size-3.5" />
              Enviar al Programador
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Origen</CardTitle>
          <CardDescription>
            {source ? "Hook seleccionado desde la biblioteca" : "Sin hook de referencia"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          {source ? (
            <>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="secondary">{source.hookType}</Badge>
                <Badge variant="outline">{source.niche}</Badge>
              </div>
              <p className="text-sm font-medium text-foreground">
                &ldquo;{source.hook}&rdquo;
              </p>
              <p className="text-xs text-muted-foreground">
                Por {source.creator.name} · {source.creator.handle} ·{" "}
                {formatCompactNumber(source.views)} vistas
              </p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              Ve a la Biblioteca de Hooks y usa &ldquo;Usa este hook&rdquo; en cualquier
              tarjeta para insertarlo aquí automáticamente.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
