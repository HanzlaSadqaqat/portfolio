"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen } from "lucide-react";
import { PageHeading, Card } from "@/components/admin/ui";

type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetch("/api/messages")
      .then((r) => r.json())
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function toggleRead(msg: Message) {
    await fetch("/api/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: msg._id, read: !msg.read }),
    });
    setMessages((prev) => prev.map((m) => (m._id === msg._id ? { ...m, read: !m.read } : m)));
  }

  return (
    <div>
      <PageHeading title="Messages" subtitle="Contact form submissions from your site." />

      {loading ? (
        <div className="text-text-muted text-sm">Loading…</div>
      ) : messages.length === 0 ? (
        <Card>
          <div className="text-text-muted text-sm text-center py-4">
            No messages yet.
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {messages.map((m) => (
            <Card key={m._id} className={m.read ? "" : "border-accent-primary/40"}>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="text-sm font-medium text-text-primary">{m.name}</div>
                  <a href={`mailto:${m.email}`} className="text-xs text-accent-primary hover:underline">
                    {m.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-text-dim">
                    {new Date(m.createdAt).toLocaleString()}
                  </span>
                  <button
                    onClick={() => toggleRead(m)}
                    className="text-text-secondary hover:text-accent-primary transition"
                    aria-label={m.read ? "Mark unread" : "Mark read"}
                    title={m.read ? "Mark unread" : "Mark read"}
                  >
                    {m.read ? <MailOpen size={16} /> : <Mail size={16} className="text-accent-primary" />}
                  </button>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
                {m.message}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
