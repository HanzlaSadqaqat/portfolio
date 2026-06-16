"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function ExperienceAdminPage() {
  return (
    <EntityManager
      apiBase="/api/experience"
      pageTitle="Experience"
      description="Manage your work experience timeline."
      titleField="role"
      subtitleField="company"
      emptyItem={{ role: "", company: "", period: "", bullets: [] }}
      fields={[
        { name: "role", label: "role", type: "text", required: true },
        { name: "company", label: "company", type: "text", required: true },
        { name: "period", label: "period", type: "text", required: true, placeholder: "2024 — present" },
        { name: "bullets", label: "bullets", type: "lines", required: true },
      ]}
    />
  );
}
