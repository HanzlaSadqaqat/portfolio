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
  videoUrl?: string;
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
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
  coverImage?: string;
  metaDescription?: string;
};

export const blogPosts: BlogPost[] = [
  {
    title: "Building a RAG system that actually answers questions",
    slug: "building-a-rag-system-that-actually-answers-questions",
    excerpt: "Most RAG demos look great. Most production RAG systems hallucinate. Here's what changed when I shipped mine.",
    metaDescription: "A practical breakdown of the chunking, retrieval, and re-ranking changes that took a RAG pipeline from demo-quality to production-quality.",
    content: `Most RAG demos look great. Feed it a PDF, ask a question, get a clean answer with a citation. Ship it to production with real documents and real users, and it falls apart — vague answers, confident hallucinations, retrieval that misses the one paragraph that actually mattered.

Here's what changed when I moved mine from demo to production.

## The chunking strategy was the real bottleneck

Fixed-size chunking (e.g. 500 tokens with 50 overlap) is the default in almost every tutorial, and it's the first thing to rip out. It splits tables mid-row, separates a heading from the paragraph it introduces, and has no idea that a bullet list is one coherent thought.

Switching to structure-aware chunking — splitting on markdown headings and semantic boundaries first, then packing to a token budget — cut irrelevant retrievals dramatically. The embedding model wasn't the problem. The units I was asking it to embed were.

## Retrieval needs a second pass

Vector similarity alone will happily return five chunks that are all *about* the topic without containing the *answer*. Adding a re-ranking step — pulling back 20 candidates via vector search, then re-scoring with a cross-encoder before handing the top 4 to the LLM — was the single highest-leverage change I made.

\`\`\`python
candidates = vector_store.similarity_search(query, k=20)
reranked = cross_encoder.rank(query, candidates)
context = reranked[:4]
\`\`\`

## Hallucination dropped when I stopped asking the model to guess

The prompt template mattered less than the instruction to *not answer* when the retrieved context didn't contain the answer. Explicitly allowing "I don't have enough information for that" as a valid output, and testing that the model actually takes it, closed most of the confident-wrong-answer gap.

None of this is exotic. It's chunking, re-ranking, and permission to say "I don't know" — and it's the difference between a demo and something people can trust.`,
    date: "2025-09-12",
    tags: ["AI", "RAG", "LangChain"],
  },
  {
    title: "MongoDB schema patterns I wish I knew at 22",
    slug: "mongodb-schema-patterns-i-wish-i-knew-at-22",
    excerpt: "Embedding vs referencing, when to denormalize, and the mistake I keep seeing in MERN starter repos.",
    metaDescription: "Embedding vs referencing, denormalization tradeoffs, and the schema mistake that shows up in almost every MERN starter repo.",
    content: `Every MERN tutorial teaches you to model relationships like you would in Postgres — a collection per entity, references everywhere, populate() on every read. It works at demo scale. It falls over the moment you have real traffic.

## Embed when you read together, reference when you write independently

The rule that actually holds up: if two pieces of data are almost always read together and rarely updated independently, embed them. If they're updated on different timelines by different actors, reference them.

A blog post's comments? Usually fine embedded if the count stays bounded, since you render them together and rarely need to query a comment without its post. A user's orders? Reference — orders and users are written independently, and a user document that grows unbounded with every purchase is a scaling problem you're creating on purpose.

## The mistake I keep seeing

Deeply nested references — three or four populate() calls chained to reconstruct one page — where a single denormalized read document would have worked. Every populate() is a round trip. If a view is read far more often than the underlying data changes, duplicate the fields you need onto the parent document and accept the small sync cost on write.

\`\`\`js
// instead of populating author on every post read
{ authorId: ObjectId, authorName: "...", authorAvatar: "..." }
\`\`\`

Yes, you now update it in two places when a user changes their name. That's a solved problem — a background job or a write-time fan-out. Slow reads on every page load are not as easily solved.

## Indexes are not optional

The default \`_id\` index is not a query plan. Every field you filter or sort on in a hot path needs its own index, and compound indexes need to match your actual query shape, field order included. I didn't take this seriously until a collection crossed a few hundred thousand documents and a "fast" endpoint started taking two seconds. Explain plans aren't glamorous, but they would have caught it in five minutes.`,
    date: "2025-07-04",
    tags: ["MongoDB", "MERN"],
  },
  {
    title: "n8n vs Make vs Zapier: choosing an automation tool in 2025",
    slug: "n8n-vs-make-vs-zapier-choosing-an-automation-tool-in-2025",
    excerpt: "A decision tree based on 30+ pipelines I've shipped — what each tool is actually good at.",
    metaDescription: "A practical decision tree for choosing between n8n, Make, and Zapier, based on 30+ automation pipelines shipped for real clients.",
    content: `Every "best automation tool" article is a feature-comparison table. That's not how I pick — I pick based on who's maintaining the pipeline after I hand it off, and what happens when a step fails at 2am.

## Zapier — when the client will maintain it themselves

Zapier's real strength isn't features, it's that a non-technical client can open a Zap, understand what it does, and fix a broken field mapping without calling you. If the automation is simple (trigger → 2-3 steps → done) and long-term ownership matters more than power, Zapier wins even though it's the most expensive per task.

## Make (formerly Integromat) — when the logic is genuinely complex

Make's visual canvas handles branching, iterators, and error-handling routes in a way that stays readable even at 20+ modules. For anything with real conditional logic — route by data shape, retry on specific error codes, aggregate before sending — Make is where I default. The tradeoff is that it's harder for a client to self-serve; you're usually still on the hook for changes.

## n8n — when you need to self-host, or the client has a real dev team

n8n is the only one of the three you can self-host, which matters when data residency or cost-at-scale is a concern (Zapier and Make both charge per task/op; n8n on your own server doesn't). It's also the most extensible — custom nodes, direct code steps, no vendor lock-in on where the workflow runs. The cost is setup and maintenance overhead that only makes sense if there's someone technical keeping the instance healthy.

## The actual decision tree

1. Will a non-technical person maintain this? → **Zapier**
2. Is the logic branchy/conditional and someone technical owns it? → **Make**
3. Does it need to be self-hosted, high-volume, or code-extensible? → **n8n**

I've shipped all three in production. The tool rarely fails the client — picking the wrong one for who has to live with it afterward is what fails.`,
    date: "2025-05-20",
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
