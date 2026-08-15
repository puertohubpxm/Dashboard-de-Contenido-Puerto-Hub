import { CalendarDays, Bot, UserPen } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { calendarEntries } from "@/data/mock";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Calendario de Contenido · Puerto Hub",
};

const weekdayFormatter = new Intl.DateTimeFormat("es-ES", { weekday: "long" });

export default function CalendarPage() {
  const scriptCount = calendarEntries.filter((e) => e.source === "Script").length;

  return (
    <>
      <PageHeader
        icon={CalendarDays}
        title="Calendario de Contenido"
        description="Completado automáticamente mediante scripts con hooks y ángulos de contenido"
      />

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="default" className="gap-1">
          <Bot className="size-3" />
          {scriptCount} generados por script
        </Badge>
        <Badge variant="secondary" className="gap-1">
          <UserPen className="size-3" />
          {calendarEntries.length - scriptCount} editados manualmente
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {calendarEntries.map((entry) => (
          <Card
            key={entry.date}
            className={cn(
              "flex flex-col",
              entry.source === "Script" && "border-primary/25"
            )}
          >
            <CardContent className="flex flex-col gap-3 p-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-medium capitalize text-muted-foreground">
                    {weekdayFormatter.format(new Date(entry.date))}
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    {formatDate(entry.date, { day: "numeric", month: "long" })}
                  </span>
                </div>
                {entry.source === "Script" ? (
                  <span className="flex size-7 items-center justify-center rounded-md bg-primary/15 text-primary">
                    <Bot className="size-3.5" />
                  </span>
                ) : (
                  <span className="flex size-7 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <UserPen className="size-3.5" />
                  </span>
                )}
              </div>

              <Badge variant="outline" className="w-fit">
                {entry.format}
              </Badge>

              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Ángulo
              </p>
              <p className="-mt-2 text-sm text-foreground">{entry.angle}</p>

              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Hook sugerido
              </p>
              <p className="-mt-2 text-sm italic text-foreground">
                &ldquo;{entry.hook}&rdquo;
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
