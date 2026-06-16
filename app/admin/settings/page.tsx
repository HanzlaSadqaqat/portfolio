"use client";

import { useState } from "react";
import { PageHeading, Card, Field, Input, Button, StatusMessage } from "@/components/admin/ui";

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (newPassword !== confirmPassword) {
      setError("New passwords don't match.");
      return;
    }
    setStatus("saving");
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setStatus("saved");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err: any) {
      setStatus("error");
      setError(err.message);
    }
  }

  return (
    <div>
      <PageHeading title="Settings" subtitle="Manage your admin account." />
      <Card>
        <h2 className="text-sm font-semibold text-text-primary mb-4">Change password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-sm">
          <Field label="Current password">
            <Input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </Field>
          <Field label="New password">
            <Input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
            />
          </Field>
          <Field label="Confirm new password">
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
            />
          </Field>
          {error && <div className="text-accent-red text-xs">{error}</div>}
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" loading={status === "saving"}>
              Update password
            </Button>
            <StatusMessage status={status} />
          </div>
        </form>
      </Card>
    </div>
  );
}
