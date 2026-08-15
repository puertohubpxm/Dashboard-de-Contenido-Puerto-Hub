"use client";

import { useState } from "react";
import { BookmarkPlus, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addHookToBank, hookFromCompetitorReel } from "@/lib/content-store";
import type { CompetitorAccount, CompetitorReel } from "@/data/mock";

export function SaveHookButton({
  reel,
  account,
}: {
  reel: CompetitorReel;
  account: CompetitorAccount;
}) {
  const [saved, setSaved] = useState(false);

  return (
    <Button
      variant={saved ? "secondary" : "outline"}
      size="sm"
      className="w-full"
      disabled={saved}
      onClick={() => {
        addHookToBank(hookFromCompetitorReel(reel, account));
        setSaved(true);
      }}
    >
      {saved ? <Check className="size-3.5" /> : <BookmarkPlus className="size-3.5" />}
      {saved ? "Guardado en el banco de hooks" : "Guardar en banco de hooks"}
    </Button>
  );
}
