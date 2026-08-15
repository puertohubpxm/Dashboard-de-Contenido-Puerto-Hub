import { CalendarDays } from "lucide-react";

import { PageHeader } from "@/components/dashboard/page-header";
import { CalendarMonth } from "@/components/dashboard/calendar-month";
import { calendarEntries } from "@/data/mock";
import { monthLabel } from "@/lib/calendar-grid";

export const metadata = {
  title: "Calendario de Contenido · Puerto Hub",
};

const FOCUS_YEAR = 2026;
const FOCUS_MONTH = 7; // agosto (0-indexado)

export default function CalendarPage() {
  return (
    <>
      <PageHeader
        icon={CalendarDays}
        title="Calendario de Contenido"
        description="Vista mensual de todo lo programado — haz clic en cualquier bloque para ver el guion completo y el caption"
      />

      <p className="-mt-4 text-sm font-medium text-foreground">
        {monthLabel(FOCUS_YEAR, FOCUS_MONTH)}
      </p>

      <CalendarMonth entries={calendarEntries} year={FOCUS_YEAR} month={FOCUS_MONTH} />
    </>
  );
}
