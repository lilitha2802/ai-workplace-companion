import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Mail, Loader2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AiOutput } from "@/components/AiOutput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateAi } from "@/lib/ai/generate.functions";

export const Route = createFileRoute("/email")({
  head: () => ({ meta: [{ title: "Smart Email Generator — Workplace AI" }] }),
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("Professional");
  const [length, setLength] = useState("Medium");
  const [bullets, setBullets] = useState("");
  const [output, setOutput] = useState("");

  const fn = useServerFn(generateAi);
  const mut = useMutation({
    mutationFn: async () => {
      const system = `You write workplace emails. Tone: ${tone}. Length: ${length}. Output a complete email with greeting, body paragraphs, and sign-off. Use markdown headings only if helpful.`;
      const prompt = `Recipient: ${recipient || "the recipient"}\nSubject: ${subject || "(infer one)"}\n\nKey points / context:\n${bullets}\n\nWrite the email now.`;
      const res = await fn({ data: { system, prompt } });
      return res.content;
    },
    onSuccess: (c) => setOutput(c),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AppShell title="Smart Email Generator" description="Draft polished emails in seconds">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Mail className="h-4 w-4 text-primary" /> Email brief
          </div>
          <div className="grid gap-2">
            <Label>Recipient</Label>
            <Input value={recipient} onChange={(e) => setRecipient(e.target.value)} placeholder="e.g. Marketing team, Sarah from Acme" />
          </div>
          <div className="grid gap-2">
            <Label>Subject (optional)</Label>
            <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Quarterly review follow-up" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Professional", "Friendly", "Direct", "Persuasive", "Apologetic", "Enthusiastic"].map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Length</Label>
              <Select value={length} onValueChange={setLength}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Short", "Medium", "Long"].map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>Key points</Label>
            <Textarea
              rows={7}
              value={bullets}
              onChange={(e) => setBullets(e.target.value)}
              placeholder="• Thank them for the meeting&#10;• Confirm next steps and deadline&#10;• Share two attached documents"
            />
          </div>
          <Button
            className="w-full bg-gradient-primary text-primary-foreground shadow-elegant"
            disabled={mut.isPending || !bullets.trim()}
            onClick={() => mut.mutate()}
          >
            {mut.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Generate email
          </Button>
        </div>

        <AiOutput value={output} onChange={setOutput} loading={mut.isPending} />
      </div>
    </AppShell>
  );
}
