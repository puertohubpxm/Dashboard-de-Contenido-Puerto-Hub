import { Flame } from "lucide-react";

import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";

export function MobileTopbar() {
  return (
    <header className="flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:hidden">
      <MobileSidebar />
      <div className="flex items-center gap-1.5 text-sm font-semibold">
        <Flame className="size-4 text-primary" />
        Puerto Hub
      </div>
    </header>
  );
}
