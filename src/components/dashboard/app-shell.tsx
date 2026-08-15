import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileTopbar } from "@/components/dashboard/mobile-topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-svh w-full bg-background">
      <Sidebar />
      <div className="flex min-h-svh flex-1 flex-col">
        <MobileTopbar />
        <main className="flex-1 px-4 py-6 lg:px-10 lg:py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
