import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { ListChecks, Loader2 } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { AiOutput } from "@/components/AiOutput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateAi } from "@/lib/ai/generate.functions";

export const Route = createFileRoute("/tasks")({
  head: () => ({ meta: [{ title: "AI Task Planner — Workplace AI" }] }),
  component: TasksPage,
});

function TasksPage() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [context, setContext] = useState("");
  const [output, setOutput] = useState("");
  const fn = useServerFn(generateAi);

  const mut = useMutation({
    mutationFn: async () => {
      const system =
        "You are a project planning assistant. Break down the user's goal into a clear, sequenced plan. Output: 1) Plan summary, 2) Milestones with dates, 3) A markdown task table: Priority (H/M/L) | Task | Owner | Estimate | Due. Keep tasks atomic and actionable.";
      const prompt = `Goal: ${goal}\nDeadline: ${deadline || "not specified"}\n\nContext / constraints:\n${context || "(none)"}\n\nCreate the plan now.`;
      const res = await fn({ data: { system, prompt } });
      return res.content;
    },
    onSuccess: (c) => setOutput(c),
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <AppShell title="AI Task Planner" description="Goals → milestones and prioritized tasks">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card space-y-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ListChecks className="h-4 w-4 text-primary" /> Plan a goal
          </div>
          <div className="grid gap-2">
            <Label>Goal</Label>
            <Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Launch the Q3 customer newsletter" />
          </div>
          <div className="grid gap-2">
            <Label>Target deadline</Label>
            <Input value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="e.g. Aug 15, or in 3 weeks" />
          </div>
          <div className="grid gap-2">
            <Label>Context, team, constraints</Label>
            <Textarea rows={7} value={context} onChange={(e) => setContext(e.target.value)} placeholder="Team: me + 1 designer. Budget: $500. Audience: existing customers." />
          </div>
          <Button
            className="w-full bg-gradient-primary text-primary-foreground shadow-elegant"
            disabled={mut.isPending || !goal.trim()}
            onClick={() => mut.mutate()}
          >
            {mut.isPending ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Generate plan
          </Button>
        </div>
        <AiOutput value={output} onChange={setOutput} loading={mut.isPending} />
      </div>
    </AppShell>
  );
}
