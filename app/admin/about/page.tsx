"use client";

import { useEffect, useState } from "react";
import { PageHeading, Card, Field, TextArea, Button, StatusMessage } from "@/components/admin/ui";

export default function AboutPage() {
  const [intro, setIntro] = useState("");
  const [highlights, setHighlights] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    fetch("/api/about")
      .then((r) => r.json())
      .then((data) => {
        setIntro((data?.intro ?? []).join("\n\n"));
        setHighlights((data?.highlights ?? []).join("\n"));
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intro: intro.split("\n").map((s) => s.trim()).filter(Boolean),
          highlights: highlights.split("\n").map((s) => s.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  }

  if (loading) return <div className="text-text-muted text-sm">Loading…</div>;

  return (
    <div>
      <PageHeading title="About" subtitle="Your bio and key highlights." />
      <Card>
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Intro (one paragraph per line)">
            <TextArea rows={6} value={intro} onChange={(e) => setIntro(e.target.value)} />
          </Field>
          <Field label="Highlights (one per line)">
            <TextArea rows={5} value={highlights} onChange={(e) => setHighlights(e.target.value)} />
          </Field>
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" loading={status === "saving"}>
              Save
            </Button>
            <StatusMessage status={status} />
          </div>
        </form>
      </Card>
    </div>
  );
}
