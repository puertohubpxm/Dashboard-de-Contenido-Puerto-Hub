import { BadgeCheck } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function SidebarProfile() {
  return (
    <div className="flex items-center gap-3 px-4 py-4">
      <Avatar className="size-10 border border-sidebar-border">
        <AvatarFallback className="bg-primary/15 text-primary">
          PH
        </AvatarFallback>
      </Avatar>
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center gap-1">
          <span className="truncate text-sm font-semibold text-sidebar-foreground">
            @puertohub.pxm
          </span>
          <BadgeCheck className="size-3.5 shrink-0 text-primary" />
        </div>
        <span className="truncate text-xs text-sidebar-foreground/50">
          Panel de creador
        </span>
      </div>
    </div>
  );
}
