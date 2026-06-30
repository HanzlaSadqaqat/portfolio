import { MongoClient, ObjectId } from "mongodb";

const ATLAS_URI = "mongodb+srv://hanzlarajput:hsrajput786%40@cluster0.fnawbb2.mongodb.net/portfolio";
const DB_NAME = "portfolio";

// ── Real data from resume ────────────────────────────────────────

const profile = {
  name: "Hanzla Sadaqat",
  initials: "HS",
  role: "Full Stack Developer",
  tagline:
    "Dynamic and goal-oriented Software Engineer with expertise in React, Next.js, Node.js, and modern web technologies. Building scalable MERN applications and high-quality user experiences under tight deadlines.",
  location: "Multan, Punjab, PK",
  email: "hanzlasadaqatrajput@gmail.com",
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/HanzlaSadqaqat",
    linkedin: "https://linkedin.com/in/hanzla-sadaqat",
    twitter: "https://gitlab.com/hrajput786",
  },
};

const about = {
  intro: [
    "I'm a dynamic and goal-oriented Full Stack Software Engineer with expertise in frontend technologies like React, React Native, Next.js, Tailwind CSS, and modern UI libraries (Ant Design, Material UI, Shadcn UI).",
    "On the backend, I'm skilled with Node.js, Express.js, and databases including MongoDB, MySQL, and PostgreSQL. I have strong knowledge of TypeScript, JavaScript, and cloud platforms such as AWS, Cloudinary, and Vercel.",
    "I thrive in collaborative environments and consistently deliver high-quality, scalable solutions — from full SaaS platforms to complex UI migrations — always on time.",
  ],
  highlights: [
    "3+ years of professional software engineering experience across full-time and freelance roles",
    "Worked with US, Canadian, and UAE companies on Upwork maintaining a 5.0 rating",
    "Built 8+ projects for AireBrokers (US Real Estate) and led full frontend delivery",
    "Contributed to SaaS products in real estate, restaurant management, and car towing",
    "Experienced in FoxPro → Next.js tech migrations and full product rebuilds from scratch",
    "Skilled across the stack: Mongo schemas → Express APIs → React/Next.js UI → Vercel deploys",
  ],
};

const skills = [
  {
    order: 0,
    category: "Frontend",
    items: [
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "CSS / SCSS",
      "Redux",
      "Material UI",
      "Ant Design",
      "Shadcn UI",
      "Hero UI",
      "Framer Motion",
    ],
  },
  {
    order: 1,
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs"],
  },
  {
    order: 2,
    category: "Databases",
    items: ["MongoDB", "MySQL", "PostgreSQL", "SQL", "Sequelize ORM"],
  },
  {
    order: 3,
    category: "Cloud & DevOps",
    items: ["AWS", "AWS S3", "Cloudinary", "Vercel", "Cpanel", "Git", "GitHub", "GitLab"],
  },
];

const experience = [
  {
    order: 0,
    role: "Frontend Software Engineer",
    company: "AireBrokers · Upwork (US Company) · Full Time",
    period: "Nov 2024 — Present",
    bullets: [
      "Built complete user interfaces for a US-based real estate company using React, Next.js, Tailwind CSS, and Material UI (MUI).",
      "Delivered 8+ projects over the engagement period, several developed entirely from scratch.",
      "Contributed across multiple software platforms and solutions within the company's product ecosystem.",
      "Maintained a 5.0 client rating with consistently clean, efficient, and well-structured code.",
    ],
  },
  {
    order: 1,
    role: "Frontend Software Engineer (Next.js)",
    company: "FOXTOW · Upwork (UAE Company) · Part Time",
    period: "May 2025 — Nov 2025",
    bullets: [
      "Built complete UIs for a UAE-based car towing SaaS platform using Next.js, Tailwind CSS, and Material UI.",
      "Contributed to the company's technology migration, moving their software from FoxPro to a modern Next.js stack.",
      "Delivered responsive, cross-platform frontend solutions for car towing services.",
    ],
  },
  {
    order: 2,
    role: "Frontend Software Engineer",
    company: "FOXTOW · Upwork (US Company) · Part Time",
    period: "Sep 2024 — Jan 2025",
    bullets: [
      "Developed frontend interfaces for a US-based car towing SaaS platform using Next.js, Tailwind CSS, and MUI.",
      "Helped migrate legacy FoxPro software to a modern Next.js technology stack.",
      "Built and maintained scalable UI components across the towing services platform.",
    ],
  },
  {
    order: 3,
    role: "Full Stack Software Engineer",
    company: "MenuScribe · Upwork (Canadian Company) · Part Time",
    period: "Feb 2024 — Nov 2024",
    bullets: [
      "Developed multiple features for a Restaurant Chain Management SaaS platform (React, Node.js, Express, SQL with Sequelize).",
      "Built and maintained REST APIs on the backend and implemented UI features on the frontend from Figma designs.",
      "Worked as a true full-stack contributor owning both API and UI layers of the product.",
    ],
  },
  {
    order: 4,
    role: "Software Engineer",
    company: "AccellionX · Full Time",
    period: "Oct 2023 — Apr 2024",
    bullets: [
      "Joined as Associate Software Engineer focused on Node.js backend development, promoted to Software Engineer.",
      "Expanded expertise to React.js with Redux, React Native, MongoDB, and TypeScript across production applications.",
      "Gained additional experience in Solidity for blockchain-related development.",
    ],
  },
];

const education = [
  {
    order: 0,
    degree: "BS Information Technology",
    school: "Bahauddin Zakariya University",
    period: "2019 — 2023",
  },
];

const projects = [
  {
    order: 0,
    name: "AireBrokers Platform",
    description:
      "Full frontend development for a US-based real estate company. Built 8+ projects using React, Next.js, Tailwind CSS, and MUI — some entirely from scratch.",
    tech: ["React", "Next.js", "Tailwind CSS", "Material UI", "TypeScript"],
    status: "live",
    github: "",
    live: "",
  },
  {
    order: 1,
    name: "MenuScribe",
    description:
      "Restaurant Chain Management SaaS for a Canadian startup. Full-stack role: REST APIs with Node/Express/Sequelize, plus React UI built from Figma designs.",
    tech: ["React", "Node.js", "Express.js", "SQL", "Sequelize", "PostgreSQL"],
    status: "live",
    github: "",
    live: "",
  },
  {
    order: 2,
    name: "FOXTOW Platform",
    description:
      "Car towing SaaS platform for US and UAE markets. Led frontend delivery and contributed to a full tech migration from legacy FoxPro to a modern Next.js stack.",
    tech: ["Next.js", "Tailwind CSS", "Material UI", "TypeScript"],
    status: "live",
    github: "",
    live: "",
  },
  {
    order: 3,
    name: "AccellionX App",
    description:
      "Multi-platform product built with React, React Native, Node.js, MongoDB, and TypeScript. Handled both mobile and web surfaces with Redux state management.",
    tech: ["React", "React Native", "Node.js", "MongoDB", "TypeScript", "Redux"],
    status: "live",
    github: "",
    live: "",
  },
];

// ── Automations — keep the existing n8n ones from DB ─────────────
// These will be fetched from DB and preserved as-is

async function run() {
  console.log("Connecting to MongoDB Atlas...");
  const client = new MongoClient(ATLAS_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  // ── Fetch existing automations to preserve them ──────────────
  const existingAutomations = await db.collection("automations").find({}).toArray();
  console.log(`\nPreserving ${existingAutomations.length} existing automation(s).`);

  // ── Replace collections ────────────────────────────────────
  const replacements = [
    { name: "profiles",   docs: [profile] },
    { name: "abouts",     docs: [about] },
    { name: "skills",     docs: skills },
    { name: "experiences",docs: experience },
    { name: "educations", docs: education },
    { name: "projects",   docs: projects },
  ];

  for (const { name, docs } of replacements) {
    await db.collection(name).drop().catch(() => {});
    await db.collection(name).insertMany(docs);
    console.log(`  [${name}] replaced with ${docs.length} real document(s)`);
  }

  // ── Automations: keep existing if they have content, else seed defaults ──
  if (existingAutomations.length > 0) {
    console.log(`  [automations] kept existing ${existingAutomations.length} document(s) unchanged`);
  } else {
    const defaultAutomations = [
      {
        order: 0,
        title: "Lead Enrichment Pipeline",
        problem: "Sales team spent 6+ hours/week manually researching leads on LinkedIn.",
        solution: "Built an n8n + OpenAI pipeline that pulls leads from a CRM, enriches with Apollo, summarizes the company, and writes a first-touch email draft.",
        stack: ["n8n", "OpenAI", "Apollo.io", "HubSpot"],
        impact: "~5 hours/week saved per rep; reply rate up 23%.",
      },
      {
        order: 1,
        title: "Support Ticket Auto-Triage",
        problem: "Inbox of 200+ daily tickets, slow first-response times.",
        solution: "LangChain classifier + RAG over the help-center docs. Tickets are tagged, routed, and answered with a draft reply that the agent edits.",
        stack: ["LangChain", "Pinecone", "Zendesk API", "OpenAI"],
        impact: "First-response time cut from 4h to 12 min.",
      },
      {
        order: 2,
        title: "Invoice OCR + Sheets Sync",
        problem: "Finance was manually keying invoices into Google Sheets.",
        solution: "Make scenario watches a Drive folder, runs GPT-4o vision OCR, normalizes fields, and appends rows with validation.",
        stack: ["Make", "GPT-4o", "Google Drive", "Sheets"],
        impact: "~12 hours/month reclaimed; 99% extraction accuracy.",
      },
    ];
    await db.collection("automations").insertMany(defaultAutomations);
    console.log(`  [automations] seeded ${defaultAutomations.length} default n8n automation(s)`);
  }

  await client.close();
  console.log("\nAll real data seeded successfully.");
}

run().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
