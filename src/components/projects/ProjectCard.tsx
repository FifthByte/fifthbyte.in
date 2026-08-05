import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "@/data/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group shadow-soft hover:shadow-lift relative overflow-hidden rounded-2xl border border-border bg-card p-2 transition-shadow duration-300"
    >
      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-br ${project.gradient}`}
      >
        <div className="dot-matrix absolute inset-0 opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/25 to-transparent" />
        <motion.div
          aria-hidden
          className="bg-gradient-accent absolute -inset-x-8 -top-16 h-40 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        />
        <div className="glass absolute bottom-3 left-3 rounded-lg px-2.5 py-1 text-[0.65rem] font-medium tracking-wide">
          {project.category}
        </div>
      </div>

      <div className="p-3.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight">{project.name}</h3>
          <span className="flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-foreground">
            View
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-lg border border-border bg-surface px-2 py-0.5 text-[0.68rem] text-muted-foreground"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
