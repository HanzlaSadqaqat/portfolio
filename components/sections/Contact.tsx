"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Twitter, Mail, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import type { Profile } from "@/lib/data";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/SectionHeading";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact({ profile }: { profile: Profile }) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="px-6 py-20 md:py-28 bg-bg-soft">
      <Container>
        <SectionHeading number="06 — Contact" title="Get In Touch" subtitle="Have a project in mind? Let's talk." />

        <div className="grid md:grid-cols-5 gap-8 mt-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-5 text-sm"
          >
            <p className="text-text-secondary leading-relaxed">
              Whether it&apos;s a MERN build, an AI automation idea, or just to say hi —
              drop a message and I&apos;ll reply within 24 hours.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-text-secondary hover:text-accent-primary transition group"
              >
                <Mail size={16} className="text-accent-primary" />
                <span className="group-hover:underline">{profile.email}</span>
              </a>
              <div className="flex items-center gap-3 text-text-secondary">
                <MapPin size={16} className="text-accent-primary" />
                <span>{profile.location}</span>
              </div>
            </div>

            <div className="pt-4 flex gap-2">
              <SocialLink href={profile.social.github} icon={<Github size={16} />} label="GitHub" />
              <SocialLink href={profile.social.linkedin} icon={<Linkedin size={16} />} label="LinkedIn" />
              <SocialLink href={profile.social.twitter} icon={<Twitter size={16} />} label="Twitter" />
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-3 bg-bg-card border border-bg-border rounded-2xl p-6 space-y-4"
          >
            <Field
              label="Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              placeholder="Your name"
              required
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              placeholder="you@example.com"
              required
            />
            <Field
              label="Message"
              value={form.message}
              onChange={(v) => setForm({ ...form, message: v })}
              placeholder="What's on your mind?"
              required
              textarea
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-accent-primary text-white font-medium rounded-full hover:bg-accent-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending…" : <>Send Message <Send size={14} /></>}
            </button>

            {status === "sent" && (
              <div className="text-sm text-accent-green flex items-center gap-2">
                <CheckCircle2 size={14} /> Message sent. I&apos;ll get back to you soon.
              </div>
            )}
            {status === "error" && (
              <div className="text-sm text-accent-red flex items-center gap-2">
                <AlertCircle size={14} /> Something went wrong. Try emailing me directly.
              </div>
            )}
          </motion.form>
        </div>
      </Container>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const baseClasses =
    "w-full bg-bg-soft border border-bg-border rounded-lg px-3 py-2.5 text-text-primary text-sm placeholder:text-text-dim focus:border-accent-primary focus:outline-none transition";
  return (
    <div>
      <label className="block text-xs font-medium text-text-muted mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={5}
          className={`${baseClasses} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={baseClasses}
        />
      )}
    </div>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-2 bg-bg-card border border-bg-border rounded-full text-xs text-text-secondary hover:border-accent-primary hover:text-accent-primary transition"
    >
      {icon} {label}
    </a>
  );
}
