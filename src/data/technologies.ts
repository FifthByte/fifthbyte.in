import { Cloud, Cpu, Layout, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type TechCategory = {
  title: string;
  blurb: string;
  icon: LucideIcon;
  items: string[];
};

export const techCategories: TechCategory[] = [
  {
    title: "Frontend Experience",
    blurb: "Creating pixel-perfect, highly interactive user interfaces.",
    icon: Layout,
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
  },
  {
    title: "Backend Architecture",
    blurb: "Scalable, secure, and robust server-side engineering.",
    icon: Server,
    items: ["Python", "Django", "FastAPI", "PostgreSQL", "MySQL", "Redis", "Celery"],
  },
  {
    title: "Cloud & DevOps",
    blurb: "Reliable infrastructure and automated deployment workflows.",
    icon: Cloud,
    items: [
      "AWS",
      "Docker",
      "GitHub Actions",
      "Railway",
      "Render",
      "Vercel",
      "Nginx",
      "Cloudflare",
      "cPanel",
    ],
  },
  {
    title: "AI & Intelligent Systems",
    blurb: "Building AI-powered products and intelligent workflows.",
    icon: Cpu,
    items: [
      "OpenAI",
      "Gemini",
      "Anthropic Claude",
      "LangChain",
      "OpenClaw",
      "Cloud",
      "Lovable",
      "Antigravity",
      "MCP",
      "Vector Databases",
      "Prompt Engineering",
    ],
  },
];
