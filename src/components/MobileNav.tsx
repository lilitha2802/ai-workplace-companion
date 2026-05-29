import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { url: "/", icon: LayoutDashboard, label: "Home" },
  { url: "/email", icon: Mail, label: "Email" },
  { url: "/notes", icon: FileText, label: "Notes" },
  { url: "/tasks", icon: ListChecks, label: "Tasks" },
  { url: "/research", icon: Search, label: "Research" },
  { url: "/chat", icon: MessageSquare, label: "Chat" },
  { url: "/portfolio", icon: User, label: "Me" },
] as const;

export function MobileNav() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-sidebar border-t border-sidebar-border flex justify-around py-2">
      {items.map((i) => {
        const active = path === i.url;
        return (
          <Link
            key={i.url}
            to={i.url}
            className={cn(
              "flex flex-col items-center gap-0.5 px-2 py-1 rounded-md text-[10px]",
              active ? "text-primary" : "text-muted-foreground",
            )}
          >
            <i.icon className="h-5 w-5" />
            <span>{i.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
