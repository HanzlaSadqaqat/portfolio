// =======================================================
// 👋 EDIT THIS FILE to personalize your portfolio.
// All content (name, projects, skills, etc.) lives here.
// =======================================================

export type Profile = {
  name: string;
  initials: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  resumeUrl: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
};

export const profile: Profile = {
  name: "YourName",
  initials: "YN",
  role: "MERN & AI Automation Engineer",
  tagline: "I build full-stack apps and wire LLMs into real workflows.",
  location: "Punjab, PK",
  email: "you@example.com",
  resumeUrl: "/resume.pdf", // place a PDF in /public to enable download
  social: {
    github: "https://github.com/yourname",
    linkedin: "https://linkedin.com/in/yourname",
    twitter: "https://twitter.com/yourname",
  },
};

export type About = {
  intro: string[];
  highlights: string[];
};

export const about: About = {
  intro: [
    "I'm a full-stack developer focused on the MERN ecosystem (MongoDB, Express, React, Node) and AI automation.",
    "I help teams ship production web apps and replace repetitive work with LLM-powered automations — Gmail triage, document parsing, lead enrichment, internal copilots.",
  ],
  highlights: [
    "3+ years building production MERN applications",
    "Designed and shipped 10+ AI automation pipelines",
    "Comfortable across the stack: from Mongo schemas to Tailwind UI",
    "Tooling: OpenAI, LangChain, n8n, Make, Zapier, Pinecone",
  ],
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind", "Redux", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Prisma", "REST", "GraphQL"] },
  { category: "AI / Automation", items: ["OpenAI", "LangChain", "Pinecone", "n8n", "Make", "Zapier", "RAG"] },
  { category: "DevOps", items: ["Docker", "Vercel", "AWS", "GitHub Actions", "Linux"] },
];

export type Project = {
  name: string;
  description: string;
  tech: string[];
  status: "live" | "beta" | "wip";
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    name: "inbox-ai",
    description: "GPT-powered email triage. Reads Gmail, classifies, summarizes, drops Slack alerts for high-priority threads.",
    tech: ["Node", "OpenAI", "Gmail API", "MongoDB"],
    status: "live",
    github: "https://github.com/yourname/inbox-ai",
    live: "https://inbox-ai.example.com",
  },
  {
    name: "shopflow",
    description: "MERN e-commerce dashboard with Stripe payments, inventory tracking, and analytics. JWT auth, role-based access.",
    tech: ["React", "Express", "MongoDB", "Stripe"],
    status: "beta",
    github: "https://github.com/yourname/shopflow",
  },
  {
    name: "docu-rag",
    description: "Retrieval-augmented chatbot for PDF knowledge bases. Pinecone vector store, streaming responses, citation UI.",
    tech: ["Next.js", "LangChain", "Pinecone", "OpenAI"],
    status: "live",
    github: "https://github.com/yourname/docu-rag",
    live: "https://docu-rag.example.com",
  },
  {
    name: "habit-loop",
    description: "Mobile-first habit tracker with streak analytics, dark mode, and PWA install. Offline-first via service workers.",
    tech: ["React", "Node", "MongoDB", "Chart.js"],
    status: "live",
    github: "https://github.com/yourname/habit-loop",
  },
];

export type Automation = {
  title: string;
  problem: string;
  solution: string;
  stack: string[];
  impact: string;
};

export const automations: Automation[] = [
  {
    title: "Lead Enrichment Pipeline",
    problem: "Sales team spent 6+ hours/week manually researching leads on LinkedIn.",
    solution: "Built an n8n + OpenAI pipeline that pulls leads from a CRM, enriches with Apollo, summarizes the company, and writes a first-touch email draft.",
    stack: ["n8n", "OpenAI", "Apollo.io", "HubSpot"],
    impact: "~5 hours/week saved per rep; reply rate up 23%.",
  },
  {
    title: "Support Ticket Auto-Triage",
    problem: "Inbox of 200+ daily tickets, slow first-response times.",
    solution: "LangChain classifier + RAG over the help-center docs. Tickets are tagged, routed, and answered with a draft reply that the agent edits.",
    stack: ["LangChain", "Pinecone", "Zendesk API", "OpenAI"],
    impact: "First-response time cut from 4h to 12 min.",
  },
  {
    title: "Invoice OCR + Sheets Sync",
    problem: "Finance was manually keying invoices into Google Sheets.",
    solution: "Make scenario watches a Drive folder, runs GPT-4o vision OCR, normalizes fields, and appends rows with validation.",
    stack: ["Make", "GPT-4o", "Google Drive", "Sheets"],
    impact: "~12 hours/month reclaimed; 99% extraction accuracy.",
  },
];

export type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  url: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    title: "Building a RAG system that actually answers questions",
    excerpt: "Most RAG demos look great. Most production RAG systems hallucinate. Here's what changed when I shipped mine.",
    date: "2025-09-12",
    readTime: "8 min",
    url: "#",
    tags: ["AI", "RAG", "LangChain"],
  },
  {
    title: "MongoDB schema patterns I wish I knew at 22",
    excerpt: "Embedding vs referencing, when to denormalize, and the mistake I keep seeing in MERN starter repos.",
    date: "2025-07-04",
    readTime: "6 min",
    url: "#",
    tags: ["MongoDB", "MERN"],
  },
  {
    title: "n8n vs Make vs Zapier: choosing an automation tool in 2025",
    excerpt: "A decision tree based on 30+ pipelines I've shipped — what each tool is actually good at.",
    date: "2025-05-20",
    readTime: "10 min",
    url: "#",
    tags: ["Automation", "n8n", "Make"],
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "AI Automation Engineer",
    company: "Acme Studio (freelance)",
    period: "2024 — present",
    bullets: [
      "Designed LLM workflows in n8n and LangChain for 5+ SMB clients.",
      "Cut manual ops work by 40+ hours/week across deployments.",
      "Stack: OpenAI, Pinecone, LangChain, n8n, Make.",
    ],
  },
  {
    role: "Full-Stack Developer (MERN)",
    company: "Self-employed",
    period: "2022 — present",
    bullets: [
      "Built 10+ production MERN apps for clients in e-commerce, edtech, SaaS.",
      "Owned the full lifecycle: Mongo modeling, Express APIs, React UI, deploys.",
    ],
  },
  {
    role: "Junior Developer",
    company: "Local Web Agency",
    period: "2021 — 2022",
    bullets: [
      "Shipped React frontends and Node services for client websites.",
      "Wrote integration tests and set up CI on GitHub Actions.",
    ],
  },
];

export type Education = {
  degree: string;
  school: string;
  period: string;
};

export const education: Education[] = [
  {
    degree: "B.Sc. Computer Science",
    school: "Your University",
    period: "2018 — 2022",
  },
];
