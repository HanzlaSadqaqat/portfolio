"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function AutomationsAdminPage() {
  return (
    <EntityManager
      apiBase="/api/automations"
      pageTitle="Automations"
      description="Manage your AI automation case studies."
      titleField="title"
      subtitleField="impact"
      emptyItem={{ title: "", problem: "", solution: "", stack: [], impact: "" }}
      fields={[
        { name: "title", label: "title", type: "text", required: true },
        { name: "problem", label: "problem", type: "textarea", required: true },
        { name: "solution", label: "solution", type: "textarea", required: true },
        { name: "stack", label: "stack", type: "tags", required: true, placeholder: "n8n, OpenAI, HubSpot" },
        { name: "impact", label: "impact", type: "text", required: true },
      ]}
    />
  );
}
