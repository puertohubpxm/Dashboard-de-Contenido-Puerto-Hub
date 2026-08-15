import { Radar, Heart, MessageCircle, Eye, RefreshCw } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { competitorReels } from "@/data/mock";
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
  return (
    <>
      <PageHeader
        icon={Radar}
        title="Seguimiento de Competidores"
        description="Los mejores reels de los creadores que sigues, recopilados semanalmente"
        actions={
          <Button variant="outline" size="sm">
            <RefreshCw className="size-3.5" />
            Actualizar recopilación
          </Button>
        }
      />

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="secondary">Semana del 10–16 de agosto</Badge>
        {competitorReels.length} reels recopilados de {new Set(competitorReels.map((r) => r.handle)).size} cuentas seguidas
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {competitorReels.map((reel) => (
          <Card key={reel.id}>
            <CardContent className="flex flex-col gap-4 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      {initials(reel.creator)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">
                      {reel.creator}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {reel.handle}
                    </span>
                  </div>
                </div>
                <Badge variant="outline">{reel.niche}</Badge>
              </div>

              <p className="text-sm font-medium leading-snug text-foreground">
                {reel.title}
              </p>

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
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
