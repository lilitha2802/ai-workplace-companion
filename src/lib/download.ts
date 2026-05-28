import { jsPDF } from "jspdf";

export function downloadMarkdown(content: string, filename: string) {
  if (!content.trim()) return;
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.md`;
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadPDF(content: string, title: string) {
  if (!content.trim()) return;
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 14;
  const maxWidth = pageWidth - margin * 2;

  doc.setFontSize(18);
  doc.text(title, margin, 20);

  doc.setFontSize(11);
  const lines = doc.splitTextToSize(content, maxWidth);
  doc.text(lines, margin, 30);

  doc.save(`${title}.pdf`);
}
