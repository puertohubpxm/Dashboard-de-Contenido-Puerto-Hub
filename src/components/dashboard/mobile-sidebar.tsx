"use client";

import { useState } from "react";
import { Menu, Flame } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";
import { SidebarProfile } from "@/components/dashboard/sidebar-profile";

export function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="size-5" />
          <span className="sr-only">Abrir menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
        <div className="flex h-full flex-col">
          <SidebarProfile />
          <Separator className="bg-sidebar-border" />
          <SidebarNav onNavigate={() => setOpen(false)} />
          <Separator className="bg-sidebar-border" />
          <div className="flex items-center gap-2 px-4 py-4 text-xs text-sidebar-foreground/40">
            <Flame className="size-3.5 text-primary" />
            Puerto Hub · Content OS
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
