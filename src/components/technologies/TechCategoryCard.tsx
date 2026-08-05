import { motion } from "motion/react";
import type { TechCategory } from "@/data/technologies";

export function TechCategoryCard({ category }: { category: TechCategory }) {
  const Icon = category.icon;
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group shadow-soft hover:shadow-lift relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow duration-300"
    >
      <div className="bg-gradient-accent pointer-events-none absolute -top-24 -right-16 size-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-15" />
      <div className="relative">
        <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface">
          <Icon size={18} strokeWidth={1.8} />
        </span>
        <h3 className="mt-4 text-lg tracking-tight">{category.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{category.blurb}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {category.items.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-transparent hover:bg-surface hover:text-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}
