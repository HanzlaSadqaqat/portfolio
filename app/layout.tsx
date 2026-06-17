import type { Metadata } from "next";
import "./globals.css";
import { getProfile } from "@/lib/db-queries";
import ThemeProvider from "@/components/ThemeProvider";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t===null&&d)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-bg text-text-primary font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
