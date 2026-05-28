import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FileText, Loader2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AiOutput } from "@/components/AiOutput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateAi } from "@/lib/ai/generate.functions";

export const Route = createFileRoute("/notes")({
  head: () => ({ meta: [{ title: "Meeting Notes Summarizer — Workplace AI" }] }),
  component: NotesPage,
});

function NotesPage() {
  const [transcript, setTranscript] = useState("");
  const [output, setOutput] = useState("");
  const fn = useServerFn(generateAi);

  const mut = useMutation({
    mutationFn: async () => {
      const system =
        "You summarize meeting notes for professionals. Produce: 1) TL;DR (2-3 sentences), 2) Key Discussion Points (bullets), 3) Decisions Made, 4) Action Items as a markdown table with columns: Owner | Task | Due. Be concise and faithful to the source.";
      const res = await fn({ data: { system, prompt: `Meeting notes / transcript:\n\n${transcript}` } });
      return res.content;
    },
    onSuccess: (c) => setOutput(c),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AppShell title="Meeting Notes Summarizer" description="Transcripts → clear summaries and action items">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <FileText className="h-4 w-4 text-primary" /> Paste your notes
          </div>
          <div className="grid gap-2">
            <Label>Transcript or raw notes</Label>
            <Textarea
              rows={16}
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Paste meeting transcript, bullet notes, or Zoom captions here…"
            />
          </div>
          <Button
            className="w-full bg-gradient-primary text-primary-foreground shadow-elegant"
            disabled={mut.isPending || transcript.trim().length < 20}
            onClick={() => mut.mutate()}
          >
            {mut.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Summarize meeting
          </Button>
        </div>
        <AiOutput value={output} onChange={setOutput} loading={mut.isPending} filename="meeting-notes" />
      </div>
    </AppShell>
  );
}
