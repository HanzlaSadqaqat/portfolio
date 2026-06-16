"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function BlogAdminPage() {
  return (
    <EntityManager
      apiBase="/api/blog"
      pageTitle="Blog"
      description="Manage your blog posts."
      titleField="title"
      subtitleField="date"
      emptyItem={{ title: "", excerpt: "", date: "", readTime: "", url: "#", tags: [] }}
      fields={[
        { name: "title", label: "title", type: "text", required: true },
        { name: "excerpt", label: "excerpt", type: "textarea", required: true },
        { name: "date", label: "date", type: "text", required: true, placeholder: "2025-09-12" },
        { name: "readTime", label: "read-time", type: "text", required: true, placeholder: "8 min" },
        { name: "url", label: "url", type: "url", placeholder: "https://..." },
        { name: "tags", label: "tags", type: "tags", placeholder: "AI, RAG, LangChain" },
      ]}
    />
  );
}
