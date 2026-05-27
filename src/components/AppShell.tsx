import type { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";
import { MobileNav } from "./MobileNav";

export function AppShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-gradient-subtle">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card/60 backdrop-blur px-6 flex items-center">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        </header>
        <main className="flex-1 p-6 pb-24 md:pb-6 overflow-y-auto">{children}</main>
        <footer className="hidden md:block px-6 py-3 text-[11px] text-muted-foreground border-t border-border bg-card/40">
          ⚠️ AI-generated content may be inaccurate. Always review outputs before
          sharing or acting on them. Do not include confidential data.
        </footer>
      </div>
      <MobileNav />
    </div>
  );
}
