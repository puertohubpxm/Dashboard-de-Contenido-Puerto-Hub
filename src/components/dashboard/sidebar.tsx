import { Flame } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { SidebarProfile } from "@/components/dashboard/sidebar-profile";

export function Sidebar() {
  return (
    <aside className="hidden h-svh w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      <SidebarProfile />
      <Separator className="bg-sidebar-border" />
      <SidebarNav />
      <Separator className="bg-sidebar-border" />
      <div className="flex items-center gap-2 px-4 py-4 text-xs text-sidebar-foreground/40">
        <Flame className="size-3.5 text-primary" />
        Puerto Hub · Content OS
      </div>
    </aside>
  );
}
