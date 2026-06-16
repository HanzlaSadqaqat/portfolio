"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function ProjectsAdminPage() {
  return (
    <EntityManager
      apiBase="/api/projects"
      pageTitle="Projects"
      description="Manage the projects shown on your portfolio."
      titleField="name"
      subtitleField="status"
      emptyItem={{ name: "", description: "", tech: [], status: "wip", github: "", live: "" }}
      fields={[
        { name: "name", label: "name", type: "text", required: true, placeholder: "inbox-ai" },
        { name: "description", label: "description", type: "textarea", required: true },
        { name: "tech", label: "tech", type: "tags", required: true, placeholder: "Node, OpenAI, MongoDB" },
        { name: "status", label: "status", type: "select", options: ["live", "beta", "wip"] },
        { name: "github", label: "github", type: "url", placeholder: "https://github.com/you/repo" },
        { name: "live", label: "live", type: "url", placeholder: "https://example.com" },
      ]}
    />
  );
}
