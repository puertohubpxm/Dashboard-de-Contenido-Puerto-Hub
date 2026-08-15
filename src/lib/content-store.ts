// "Banco de hooks" y borrador de guion — el puente entre Competidores → Hooks
// → /script → Programador. No hay backend todavía, así que se persiste en
// localStorage (ver CLAUDE.md § Banco de hooks y flujo hook → guion → programador).

import { hooks as mockHooks, type Hook, type HookType } from "@/data/mock";
import { readLocal, writeLocal } from "@/lib/local-store";

const HOOK_BANK_KEY = "puertohub:hook-bank";
const SCRIPT_DRAFT_KEY = "puertohub:script-draft";

export function getHookBank(): Hook[] {
  return readLocal<Hook[]>(HOOK_BANK_KEY, []);
}

export function addHookToBank(hook: Hook) {
  const bank = getHookBank();
  if (bank.some((h) => h.id === hook.id)) return;
  writeLocal(HOOK_BANK_KEY, [hook, ...bank]);
}

export function getAllHooks(): Hook[] {
  return [...getHookBank(), ...mockHooks];
}

export function getHookById(id: string): Hook | undefined {
  return getAllHooks().find((h) => h.id === id);
}

function inferHookType(text: string): HookType {
  const lower = text.toLowerCase();
  if (lower.startsWith("pov")) return "POV";
  if (/^\d/.test(text.trim())) return "Lista";
  if (text.trim().endsWith("?")) return "Pregunta";
  if (lower.startsWith("deja de") || lower.startsWith("no ")) return "Advertencia";
  if (lower.includes(" vs")) return "Comparación";
  return "Confesión";
}

export function hookFromCompetitorReel(
  reel: { id: string; hook: string; onScreenText: string; views: number },
  account: { name: string; handle: string; niche: string }
): Hook {
  return {
    id: `bank-${reel.id}`,
    hook: reel.hook,
    template: reel.hook,
    transcript: `${reel.hook} — texto en pantalla: "${reel.onScreenText}"`,
    hookType: inferHookType(reel.hook),
    niche: account.niche,
    platform: "Instagram",
    creator: { name: account.name, handle: account.handle },
    views: reel.views,
    savedAt: new Date().toISOString().slice(0, 10),
  };
}

export type ScriptDraft = {
  hookId?: string;
  hook: string;
  niche?: string;
  script: string;
  caption: string;
};

const emptyDraft: ScriptDraft = { hook: "", script: "", caption: "" };

export function getScriptDraft(): ScriptDraft {
  return readLocal<ScriptDraft>(SCRIPT_DRAFT_KEY, emptyDraft);
}

export function saveScriptDraft(draft: ScriptDraft) {
  writeLocal(SCRIPT_DRAFT_KEY, draft);
}

export function clearScriptDraft() {
  writeLocal(SCRIPT_DRAFT_KEY, emptyDraft);
}
