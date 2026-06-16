"use client";

import EntityManager from "@/components/admin/EntityManager";

export default function EducationAdminPage() {
  return (
    <EntityManager
      apiBase="/api/education"
      pageTitle="Education"
      description="Manage your education history."
      titleField="degree"
      subtitleField="school"
      emptyItem={{ degree: "", school: "", period: "" }}
      fields={[
        { name: "degree", label: "degree", type: "text", required: true },
        { name: "school", label: "school", type: "text", required: true },
        { name: "period", label: "period", type: "text", required: true, placeholder: "2018 — 2022" },
      ]}
    />
  );
}
