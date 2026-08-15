import { Radar, Heart, MessageCircle, Eye } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { SaveHookButton } from "@/components/dashboard/save-hook-button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  competitorAccounts,
  competitorReels,
  getCompetitorScanWindow,
} from "@/data/mock";
import { formatCompactNumber, formatDate } from "@/lib/format";

export const metadata = {
  title: "Seguimiento de Competidores · Puerto Hub",
};

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function CompetitorsPage() {
  const { last, next } = getCompetitorScanWindow();
  const accountsByHandle = new Map(competitorAccounts.map((a) => [a.handle, a]));
  const sorted = [...competitorReels].sort((a, b) => b.views - a.views);

  return (
    <>
      <PageHeader
        icon={Radar}
        title="Seguimiento de Competidores"
        description="Cada domingo a las 8:00 am se analizan los 5 reels con mejor rendimiento de las 8 cuentas que sigues — se transcribe el audio y se extrae el hook y el texto en pantalla"
      />

      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="secondary">
          Último análisis: {formatDate(last.toISOString(), { day: "numeric", month: "long" })} · 8:00 am
        </Badge>
        <Badge variant="outline">
          Próximo: {formatDate(next.toISOString(), { day: "numeric", month: "long" })} · 8:00 am
        </Badge>
        <span>
          {sorted.length} reels de {competitorAccounts.length} cuentas seguidas
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {sorted.map((reel) => {
          const account = accountsByHandle.get(reel.accountHandle);
          if (!account) return null;

          return (
            <Card key={reel.id}>
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {initials(account.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">
                        {account.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {account.handle} · {formatCompactNumber(account.followers)}{" "}
                        seguidores
                      </span>
                    </div>
                  </div>
                  <Badge variant="outline">{account.niche}</Badge>
                </div>

                <p className="text-sm font-medium leading-snug text-foreground">
                  {reel.title}
                </p>

                <div className="flex flex-col gap-1.5 rounded-md bg-muted/60 px-3 py-2 text-xs leading-relaxed">
                  <p>
                    <span className="font-medium text-foreground">Hook: </span>
                    <span className="text-muted-foreground">&ldquo;{reel.hook}&rdquo;</span>
                  </p>
                  <p>
                    <span className="font-medium text-foreground">
                      Texto en pantalla:{" "}
                    </span>
                    <span className="text-muted-foreground">{reel.onScreenText}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye className="size-3.5" />
                      {formatCompactNumber(reel.views)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="size-3.5" />
                      {formatCompactNumber(reel.likes)}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="size-3.5" />
                      {formatCompactNumber(reel.comments)}
                    </span>
                  </div>
                  <span>{formatDate(reel.postedAt)}</span>
                </div>

                <SaveHookButton reel={reel} account={account} />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
