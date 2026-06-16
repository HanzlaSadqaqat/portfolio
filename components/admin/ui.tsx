"use client";

import { ReactNode } from "react";
import { Loader2 } from "lucide-react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-bg-border rounded-xl p-5 md:p-6 ${className}`}>
      {children}
    </div>
  );
}

export function PageHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-text-primary mb-1">{title}</h1>
      {subtitle && <p className="text-sm text-text-muted">{subtitle}</p>}
    </div>
  );
}

export function Label({ children }: { children: ReactNode }) {
  return (
    <label className="block text-xs font-medium text-text-muted mb-1.5">{children}</label>
  );
}

const fieldBase =
  "w-full bg-bg-soft border border-bg-border rounded-lg px-3 py-2.5 text-text-primary text-sm placeholder:text-text-dim focus:border-accent-primary focus:outline-none transition";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldBase} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${fieldBase} resize-none ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${fieldBase} ${props.className ?? ""}`} />;
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}) {
  const styles: Record<string, string> = {
    primary: "bg-accent-primary border-accent-primary text-white hover:bg-accent-primary/90",
    secondary:
      "bg-white border-bg-border text-text-secondary hover:border-accent-primary hover:text-accent-primary",
    danger:
      "bg-accent-red/10 border-accent-red/30 text-accent-red hover:bg-accent-red/20",
  };
  return (
    <button
      {...rest}
      disabled={rest.disabled || loading}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium border rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  );
}

export function StatusMessage({ status }: { status: "idle" | "saving" | "saved" | "error" }) {
  if (status === "saved") return <span className="text-accent-green text-xs font-medium">Saved</span>;
  if (status === "error") return <span className="text-accent-red text-xs font-medium">Error saving</span>;
  if (status === "saving") return <span className="text-text-muted text-xs">Saving…</span>;
  return null;
}
