"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function SkillsAdminPage() {
  return (
    <EntityManager
      apiBase="/api/skills"
      pageTitle="Skills"
      description="Manage your grouped skill tags."
      titleField="category"
      subtitleField={(item) => (item.items ?? []).join(", ")}
      emptyItem={{ category: "", items: [] }}
      fields={[
        { name: "category", label: "category", type: "text", required: true, placeholder: "Frontend" },
        { name: "items", label: "items", type: "tags", required: true, placeholder: "React, Next.js, TypeScript" },
      ]}
    />
  );
}
