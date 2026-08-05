export type Project = {
  slug: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
};

export const projects: Project[] = [
  {
    slug: "atlas",
    name: "Atlas",
    category: "Developer Platform",
    description: "Deployment control plane with real-time build graphs and rollbacks.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
    gradient: "from-violet/70 via-blue/60 to-cyan/50",
  },
  {
    slug: "quill",
    name: "Quill",
    category: "AI Workflows",
    description: "Retrieval-driven assistant that turns internal docs into answers.",
    tags: ["LangChain", "OpenAI", "Vector DB", "Redis"],
    gradient: "from-blue/70 via-cyan/55 to-violet/45",
  },
  {
    slug: "ledgerly",
    name: "Ledgerly",
    category: "Fintech Dashboard",
    description: "Reconciliation engine handling millions of ledger entries per day.",
    tags: ["React", "Django", "Celery", "AWS"],
    gradient: "from-cyan/60 via-blue/60 to-violet/60",
  },
  {
    slug: "orbit",
    name: "Orbit",
    category: "Operations Suite",
    description: "Field operations tooling with offline-first sync and live routing.",
    tags: ["TypeScript", "Tailwind", "Nginx", "Cloudflare"],
    gradient: "from-violet/60 via-cyan/50 to-blue/70",
  },
  {
    slug: "signal",
    name: "Signal",
    category: "Analytics",
    description: "Event pipeline and query surface built for sub-second dashboards.",
    tags: ["Python", "MySQL", "Railway", "Recharts"],
    gradient: "from-blue/60 via-violet/55 to-cyan/60",
  },
  {
    slug: "prism",
    name: "Prism",
    category: "Design Engineering",
    description: "Interactive product site with WebGL scenes and motion systems.",
    tags: ["Three.js", "Framer Motion", "Vercel"],
    gradient: "from-cyan/55 via-violet/50 to-blue/60",
  },
];
