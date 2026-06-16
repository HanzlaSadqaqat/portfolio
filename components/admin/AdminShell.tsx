"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  FileText,
  Layers,
  FolderGit2,
  Zap,
  Newspaper,
  Briefcase,
  GraduationCap,
  Mail,
  Settings,
  LogOut,
  ExternalLink,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/about", label: "About", icon: FileText },
  { href: "/admin/skills", label: "Skills", icon: Layers },
  { href: "/admin/projects", label: "Projects", icon: FolderGit2 },
  { href: "/admin/automations", label: "Automations", icon: Zap },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Login page renders without the dashboard chrome.
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-bg-soft text-text-primary flex font-sans">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-bg-line bg-white hidden md:flex flex-col">
        <div className="px-5 py-5 border-b border-bg-line">
          <span className="font-semibold text-text-primary">Admin</span>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition ${
                  active
                    ? "bg-accent-primary/10 text-accent-primary font-medium"
                    : "text-text-secondary hover:bg-bg-soft hover:text-text-primary"
                }`}
              >
                <Icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-bg-line space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-text-secondary hover:text-accent-primary transition"
          >
            <ExternalLink size={14} /> View site
          </a>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-text-secondary hover:text-accent-red transition"
          >
            <LogOut size={14} /> Log out
          </button>
          {session?.user?.email && (
            <div className="px-3 pt-2 text-[11px] text-text-dim truncate">
              {session.user.email}
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto px-5 md:px-8 py-8">{children}</div>
      </main>
    </div>
  );
}
