import { Copy, Check, FileDown, FileText } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { downloadMarkdown, downloadPDF } from "@/lib/download";

export function AiOutput({
  value,
  onChange,
  loading,
  placeholder = "AI output will appear here. You can edit it before using.",
  filename = "ai-output",
}: {
  value: string;
  onChange: (v: string) => void;
  loading?: boolean;
  placeholder?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/40">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Output (editable)
        </span>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => downloadMarkdown(value, filename)}
            disabled={!value}
            title="Download as Markdown"
          >
            <FileText className="h-4 w-4" />
            <span className="ml-1 text-xs">.md</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => downloadPDF(value, filename)}
            disabled={!value}
            title="Download as PDF"
          >
            <FileDown className="h-4 w-4" />
            <span className="ml-1 text-xs">.pdf</span>
          </Button>
          <Button size="sm" variant="ghost" onClick={copy} disabled={!value}>
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="ml-1 text-xs">{copied ? "Copied" : "Copy"}</span>
          </Button>
        </div>
      </div>
      <Textarea
        value={loading && !value ? "Generating…" : value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="min-h-[280px] border-0 rounded-none focus-visible:ring-0 resize-y"
      />
    </div>
  );
}

