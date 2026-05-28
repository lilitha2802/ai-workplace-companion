import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Send, Loader2, MessageSquare, User, Sparkles, FileDown, FileText } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { chatAi } from "@/lib/ai/generate.functions";
import { downloadMarkdown, downloadPDF } from "@/lib/download";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Chatbot — Workplace AI" }] }),
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string };

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const fn = useServerFn(chatAi);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const mut = useMutation({
    mutationFn: async (next: Msg[]) => {
      const res = await fn({ data: { messages: next } });
      return res.content;
    },
    onSuccess: (content) =>
      setMessages((m) => [...m, { role: "assistant", content }]),
    onError: (e: Error) => toast.error(e.message),
  });

  const send = () => {
    const text = input.trim();
    if (!text || mut.isPending) return;
    const next: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    mut.mutate(next);
  };

  return (
    <AppShell title="AI Chatbot" description="Your always-on workplace copilot">
      <div className="mx-auto max-w-3xl rounded-xl border border-border bg-card shadow-card flex flex-col h-[calc(100vh-12rem)]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-16">
              <div className="mx-auto h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-elegant mb-4">
                <MessageSquare className="h-6 w-6 text-primary-foreground" />
              </div>
              <p className="font-medium text-foreground">How can I help you today?</p>
              <p className="text-sm mt-1">Ask about emails, planning, summarizing, or anything work-related.</p>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
              {m.role === "assistant" && (
                <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={cn(
                  "rounded-2xl px-4 py-2.5 max-w-[80%] text-sm whitespace-pre-wrap leading-relaxed",
                  m.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted text-foreground rounded-bl-sm",
                )}
              >
                {m.content}
              </div>
              {m.role === "user" && (
                <div className="h-8 w-8 shrink-0 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          {mut.isPending && (
            <div className="flex gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-primary flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="rounded-2xl px-4 py-3 bg-muted text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-border p-4">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Message Workplace AI…"
              rows={2}
              className="resize-none"
            />
            <Button
              onClick={send}
              disabled={!input.trim() || mut.isPending}
              className="bg-gradient-primary text-primary-foreground shadow-elegant h-10"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-2">
            AI may produce inaccurate information. Don't share confidential data.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
