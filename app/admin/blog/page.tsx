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
      emptyItem={{
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        date: "",
        readTime: "",
        tags: [],
        coverImage: "",
        metaDescription: "",
      }}
      fields={[
        { name: "title", label: "title", type: "text", required: true },
        {
          name: "slug",
          label: "slug",
          type: "text",
          placeholder: "leave blank to auto-generate from title",
        },
        { name: "excerpt", label: "excerpt (shown in lists)", type: "textarea", required: true },
        {
          name: "content",
          label: "content (markdown supported)",
          type: "textarea",
          required: true,
          rows: 16,
          placeholder: "## Heading\n\nWrite the full post here in Markdown...",
        },
        { name: "date", label: "date", type: "text", required: true, placeholder: "2025-09-12" },
        { name: "readTime", label: "read-time", type: "text", required: true, placeholder: "8 min" },
        { name: "tags", label: "tags", type: "tags", placeholder: "AI, RAG, LangChain" },
        { name: "coverImage", label: "cover image url (for previews/SEO)", type: "url", placeholder: "https://..." },
        {
          name: "metaDescription",
          label: "SEO description (falls back to excerpt)",
          type: "textarea",
          placeholder: "155-160 characters shown in search results",
        },
      ]}
    />
  );
}
