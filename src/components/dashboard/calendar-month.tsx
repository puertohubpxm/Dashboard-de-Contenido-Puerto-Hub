"use client";

import { useMemo, useState } from "react";
import { Aperture, Music2, PlaySquare } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { buildMonthGrid, toDateKey, weekdayLabels } from "@/lib/calendar-grid";
import type { CalendarEntry, Platform } from "@/data/mock";
import { cn } from "@/lib/utils";

const platformIcons: Record<Platform, typeof Aperture> = {
  Instagram: Aperture,
  TikTok: Music2,
  "YouTube Shorts": PlaySquare,
};

const platformDot: Record<Platform, string> = {
  Instagram: "bg-primary",
  TikTok: "bg-foreground",
  "YouTube Shorts": "bg-destructive",
};

export function CalendarMonth({
  entries,
  year,
  month,
}: {
  entries: CalendarEntry[];
  year: number;
  month: number;
}) {
  const weeks = useMemo(() => buildMonthGrid(year, month), [year, month]);
  const entriesByDate = useMemo(() => {
    const map = new Map<string, CalendarEntry[]>();
    for (const entry of entries) {
      const list = map.get(entry.date) ?? [];
      list.push(entry);
      map.set(entry.date, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.time.localeCompare(b.time));
    }
    return map;
  }, [entries]);

  const [selected, setSelected] = useState<CalendarEntry | null>(null);
  const [open, setOpen] = useState(false);
  const todayKey = toDateKey(new Date());

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="grid grid-cols-7 border-b border-border bg-muted/40">
          {weekdayLabels.map((label) => (
            <div
              key={label}
              className="px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {weeks.map((week, weekIndex) =>
            week.map(({ date, inMonth }) => {
              const key = toDateKey(date);
              const dayEntries = entriesByDate.get(key) ?? [];
              const isToday = key === todayKey;

              return (
                <div
                  key={key}
                  className={cn(
                    "flex min-h-28 flex-col gap-1 border-b border-r border-border p-1.5 last:border-r-0",
                    weekIndex === weeks.length - 1 && "border-b-0",
                    !inMonth && "bg-muted/20"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full text-[11px] font-medium",
                      isToday
                        ? "bg-primary text-primary-foreground"
                        : inMonth
                          ? "text-foreground"
                          : "text-muted-foreground/50"
                    )}
                  >
                    {date.getDate()}
                  </span>
                  <div className="flex flex-col gap-1">
                    {dayEntries.map((entry) => {
                      const Icon = platformIcons[entry.platform];
                      return (
                        <button
                          key={entry.id}
                          onClick={() => {
                            setSelected(entry);
                            setOpen(true);
                          }}
                          className="flex items-center gap-1 rounded-md border border-border bg-card px-1.5 py-1 text-left text-[11px] leading-tight hover:border-primary/50 hover:bg-accent/40"
                        >
                          <span
                            className={cn(
                              "size-1.5 shrink-0 rounded-full",
                              platformDot[entry.platform]
                            )}
                          />
                          <span className="shrink-0 text-muted-foreground">
                            {entry.time}
                          </span>
                          <Icon className="size-3 shrink-0 text-muted-foreground" />
                          <span className="truncate text-foreground">{entry.hook}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full max-w-md gap-0 overflow-y-auto p-6">
          {selected && (
            <>
              <SheetTitle className="text-base">{selected.angle}</SheetTitle>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Badge variant="secondary">{selected.platform}</Badge>
                <Badge variant="outline">{selected.format}</Badge>
                <Badge variant="outline">
                  {selected.source === "Script" ? "Generado por script" : "Manual"}
                </Badge>
              </div>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Fecha y hora
              </p>
              <p className="text-sm text-foreground">
                {new Intl.DateTimeFormat("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(`${selected.date}T00:00:00`))}{" "}
                · {selected.time}
              </p>

              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Hook
              </p>
              <p className="text-sm italic text-foreground">&ldquo;{selected.hook}&rdquo;</p>

              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Guion completo
              </p>
              <p className="text-sm leading-relaxed text-foreground">{selected.script}</p>

              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Caption
              </p>
              <p className="whitespace-pre-line text-sm leading-relaxed text-foreground">
                {selected.caption}
              </p>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
