import { ReactNode } from "react";
import SessionProviderWrapper from "@/components/admin/SessionProviderWrapper";
import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: "Admin · Portfolio",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProviderWrapper>
      <AdminShell>{children}</AdminShell>
    </SessionProviderWrapper>
  );
}
