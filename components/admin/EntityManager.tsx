"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { Card, Field, Input, TextArea, Select, Button, PageHeading } from "./ui";

export type FieldType = "text" | "textarea" | "tags" | "lines" | "select" | "url";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

type Item = Record<string, any>;

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function toDraft(item: Item, fields: FieldConfig[]): Item {
  const draft: Item = { ...item };
  for (const f of fields) {
    if (f.type === "tags") draft[f.name] = (item[f.name] ?? []).join(", ");
    if (f.type === "lines") draft[f.name] = (item[f.name] ?? []).join("\n");
  }
  return draft;
}

function fromDraft(draft: Item, fields: FieldConfig[]): Item {
  const payload: Item = { ...draft };
  for (const f of fields) {
    if (f.type === "tags") {
      payload[f.name] = String(draft[f.name] ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }
    if (f.type === "lines") {
      payload[f.name] = String(draft[f.name] ?? "")
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
  return payload;
}

export default function EntityManager({
  apiBase,
  fields,
  titleField,
  subtitleField,
  emptyItem,
  description,
  pageTitle,
}: {
  apiBase: string;
  fields: FieldConfig[];
  titleField: string;
  subtitleField?: string | ((item: Item) => string);
  emptyItem: Item;
  description: string;
  pageTitle: string;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Item | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    fetch(apiBase)
      .then((r) => r.json())
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }

  useEffect(load, [apiBase]);

  function openNew() {
    setDraft(toDraft(emptyItem, fields));
    setIsNew(true);
  }

  function openEdit(item: Item) {
    setDraft(toDraft(item, fields));
    setIsNew(false);
  }

  function closeForm() {
    setDraft(null);
    setIsNew(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    setSaving(true);
    const payload = fromDraft(draft, fields);
    try {
      const res = await fetch(isNew ? apiBase : `${apiBase}/${draft._id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      closeForm();
      load();
    } catch {
      alert("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item? This can't be undone.")) return;
    await fetch(`${apiBase}/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
        <PageHeading title={pageTitle} subtitle={description} />
        <Button onClick={openNew} className="shrink-0">
          <Plus size={14} /> Add new
        </Button>
      </div>

      {loading ? (
        <div className="text-text-muted text-sm">Loading…</div>
      ) : items.length === 0 ? (
        <Card>
          <div className="text-text-muted text-sm text-center py-4">
            Nothing here yet. Click &quot;Add new&quot; to create one.
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <Card key={item._id} className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="text-sm font-medium text-text-primary truncate">
                  {item[titleField]}
                </div>
                {subtitleField && (
                  <div className="text-xs text-text-muted mt-0.5 truncate">
                    {typeof subtitleField === "function" ? subtitleField(item) : item[subtitleField]}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => openEdit(item)}
                  className="p-2 rounded-lg border border-bg-border text-text-secondary hover:border-accent-primary hover:text-accent-primary transition"
                  aria-label="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-2 rounded-lg border border-bg-border text-text-secondary hover:border-accent-red hover:text-accent-red transition"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {draft && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-lg max-h-[85vh] overflow-y-auto bg-bg-card border border-bg-border rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-text-primary">
                {isNew ? "Add" : "Edit"} {pageTitle.toLowerCase()}
              </h2>
              <button onClick={closeForm} className="text-text-muted hover:text-text-primary">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              {fields.map((f) => (
                <Field key={f.name} label={capitalize(f.label)}>
                  {f.type === "textarea" ? (
                    <TextArea
                      rows={3}
                      required={f.required}
                      placeholder={f.placeholder}
                      value={draft[f.name] ?? ""}
                      onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })}
                    />
                  ) : f.type === "lines" ? (
                    <TextArea
                      rows={4}
                      required={f.required}
                      placeholder={f.placeholder ?? "one per line"}
                      value={draft[f.name] ?? ""}
                      onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })}
                    />
                  ) : f.type === "select" ? (
                    <Select
                      required={f.required}
                      value={draft[f.name] ?? ""}
                      onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })}
                    >
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Input
                      type={f.type === "url" ? "url" : "text"}
                      required={f.required}
                      placeholder={
                        f.placeholder ?? (f.type === "tags" ? "comma, separated, values" : undefined)
                      }
                      value={draft[f.name] ?? ""}
                      onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })}
                    />
                  )}
                </Field>
              ))}
              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" loading={saving}>
                  Save
                </Button>
                <Button type="button" variant="secondary" onClick={closeForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
