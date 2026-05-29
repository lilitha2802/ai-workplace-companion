import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  User,
  Sparkles,
  ExternalLink,
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  Rocket,
  Zap,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Lilitha Skhuni" },
      {
        name: "description",
        content:
          "Portfolio of Lilitha Skhuni — building AI-powered productivity tools with Lovable.",
      },
    ],
  }),
  component: PortfolioPage,
});

const skills = [
  { icon: Cpu, label: "AI Acceleration", desc: "Designing prompt-driven workflows on multi-model gateways." },
  { icon: Zap, label: "Rapid Prototyping", desc: "Shipping production-grade SaaS UIs with Lovable + React." },
  { icon: Rocket, label: "Product Thinking", desc: "Turning vague problems into focused, useful tools." },
];

const tools = [
  { url: "/email", icon: Mail, title: "Smart Email Generator", desc: "Tone- and length-aware email drafts." },
  { url: "/notes", icon: FileText, title: "Meeting Notes Summarizer", desc: "Transcripts → decisions, actions, owners." },
  { url: "/tasks", icon: ListChecks, title: "AI Task Planner", desc: "Goals broken into sequenced, estimated tasks." },
  { url: "/research", icon: Search, title: "AI Research Assistant", desc: "Structured briefs with sources & next steps." },
  { url: "/chat", icon: MessageSquare, title: "AI Chatbot", desc: "Conversational copilot for everyday work." },
] as const;

function PortfolioPage() {
  return (
    <AppShell title="Portfolio" description="A snapshot of who I am and what I'm building.">
      <div className="space-y-8">
        {/* Hero */}
        <section className="rounded-2xl border border-border bg-gradient-primary text-primary-foreground p-8 shadow-elegant relative overflow-hidden">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6">
            <div className="h-20 w-20 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shrink-0">
              <User className="h-10 w-10" />
            </div>
            <div className="flex-1">
              <div className="text-xs uppercase tracking-widest opacity-80">Portfolio</div>
              <h2 className="text-3xl md:text-4xl font-semibold mt-1">Lilitha Skhuni</h2>
              <p className="mt-2 max-w-2xl opacity-90">
                Independent builder exploring how AI can take the busywork out of
                modern knowledge work — one focused tool at a time.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://lilitha-aipoweredproductivity.lovable.app"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="secondary" className="gap-2">
                    <ExternalLink className="h-4 w-4" /> Live project
                  </Button>
                </a>
                <Link to="/chat">
                  <Button variant="outline" className="gap-2 bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20">
                    <MessageSquare className="h-4 w-4" /> Talk to the AI
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            What I bring
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {skills.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="font-medium">{s.label}</div>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured project */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Featured project
          </h3>
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card">
            <div className="flex items-center gap-2 text-primary text-sm font-medium">
              <Sparkles className="h-4 w-4" /> AI Workplace Productivity Assistant
            </div>
            <h4 className="text-2xl font-semibold mt-2">
              One AI workspace. Five productivity superpowers.
            </h4>
            <p className="text-muted-foreground mt-2 max-w-3xl">
              A modern SaaS-style assistant that drafts emails, summarises meetings,
              plans tasks, runs research, and chats — all with editable outputs and a
              responsible-AI disclaimer baked in.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-6">
              {tools.map((t) => (
                <Link
                  key={t.url}
                  to={t.url}
                  className="group rounded-xl border border-border bg-background p-4 hover:border-primary/50 hover:shadow-card transition"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-md bg-primary/10 text-primary flex items-center justify-center">
                      <t.icon className="h-4 w-4" />
                    </div>
                    <div className="font-medium text-sm">{t.title}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">{t.desc}</p>
                  <div className="mt-3 flex items-center text-xs text-primary opacity-0 group-hover:opacity-100 transition">
                    Open <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2 text-xs">
              {["React 19", "TanStack Start", "Tailwind", "Lovable AI Gateway", "Gemini"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-xl border border-border bg-card p-6 shadow-card flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="font-medium">Want to see it in action?</div>
            <p className="text-sm text-muted-foreground">
              The live build is hosted on Lovable — open it in a new tab.
            </p>
          </div>
          <a
            href="https://lilitha-aipoweredproductivity.lovable.app"
            target="_blank"
            rel="noreferrer"
          >
            <Button className="bg-gradient-primary text-primary-foreground shadow-elegant gap-2">
              <ExternalLink className="h-4 w-4" /> Visit live site
            </Button>
          </a>
        </section>
      </div>
    </AppShell>
  );
}
