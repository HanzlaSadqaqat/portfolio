"use client";

import { useEffect, useState } from "react";
import { PageHeading, Card, Field, Input, Button, StatusMessage } from "@/components/admin/ui";

type ProfileForm = {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  resumeUrl: string;
  social: { github: string; linkedin: string; twitter: string };
};

const empty: ProfileForm = {
  name: "",
  initials: "",
  role: "",
  tagline: "",
  location: "",
  email: "",
  resumeUrl: "/resume.pdf",
  social: { github: "", linkedin: "", twitter: "" },
};

export default function ProfilePage() {
  const [form, setForm] = useState<ProfileForm>(empty);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.name) setForm({ ...empty, ...data, social: { ...empty.social, ...data.social } });
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
      <PageHeading title="Profile" subtitle="Your name, role, and contact details." />
      <Card>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name">
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </Field>
            <Field label="Initials">
              <Input value={form.initials} onChange={(e) => setForm({ ...form, initials: e.target.value })} required />
            </Field>
          </div>
          <Field label="Role">
            <Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required />
          </Field>
          <Field label="Tagline">
            <Input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} required />
          </Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Location">
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
            </Field>
            <Field label="Email">
              <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </Field>
          </div>
          <Field label="Resume URL">
            <Input
              value={form.resumeUrl}
              onChange={(e) => setForm({ ...form, resumeUrl: e.target.value })}
              placeholder="/resume.pdf"
            />
          </Field>

          <div className="pt-2 border-t border-bg-line">
            <div className="text-xs font-semibold text-text-muted mb-3 mt-3">Social links</div>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="GitHub">
                <Input
                  value={form.social.github}
                  onChange={(e) => setForm({ ...form, social: { ...form.social, github: e.target.value } })}
                />
              </Field>
              <Field label="LinkedIn">
                <Input
                  value={form.social.linkedin}
                  onChange={(e) => setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })}
                />
              </Field>
              <Field label="Twitter">
                <Input
                  value={form.social.twitter}
                  onChange={(e) => setForm({ ...form, social: { ...form.social, twitter: e.target.value } })}
                />
              </Field>
            </div>
          </div>

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
