import type { Metadata } from "next";
import "./globals.css";
import { getProfile } from "@/lib/db-queries";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const title = `${profile.name} — ${profile.role}`;
  return {
    title,
    description: profile.tagline,
    keywords: ["MERN", "Next.js", "AI automation", "OpenAI", "LangChain", "Node.js", "MongoDB"],
    authors: [{ name: profile.name }],
    openGraph: {
      title,
      description: profile.tagline,
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
