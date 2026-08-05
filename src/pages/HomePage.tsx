import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { HeroVisual } from "@/components/home/HeroVisual";
import { MagneticButton } from "@/components/ui-kit/MagneticButton";
import { Reveal, Stagger, StaggerItem } from "@/components/ui-kit/Reveal";
import { techCategories } from "@/data/technologies";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Link } from "react-router-dom";


export default function Index() {
  return (
    <main className="pb-28 md:pb-0">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pt-28 pb-16 md:grid-cols-2 md:gap-8 md:pt-36 md:pb-24">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="bg-gradient-accent size-1.5 rounded-full" />
            Software engineering studio
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-[2.6rem] leading-[1.03] tracking-[-0.04em] sm:text-6xl"
          >
            Software built
            <br />
            with <span className="text-gradient">intent</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground"
          >
            We design and engineer products that are fast, reliable, and made to last.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <MagneticButton to="/contact">
              Start a project
              <ArrowRight size={15} />
            </MagneticButton>
            <MagneticButton to="/projects" variant="ghost">
              See our work
            </MagneticButton>
          </motion.div>
        </div>

        <HeroVisual />
      </section>

      <section className="border-y border-border bg-surface px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl tracking-tight md:text-3xl">Selected work</h2>
            <Link
              to="/projects"
              className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              All projects
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>

          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-2xl tracking-tight md:text-3xl">How we build</h2>
            <Link
              to="/technologies"
              className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Full stack
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
          </Reveal>

          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {techCategories.map((c) => (
              <StaggerItem
                key={c.title}
                className="shadow-soft rounded-2xl border border-border bg-card p-5"
              >
                <span className="grid size-9 place-items-center rounded-xl border border-border bg-surface">
                  <c.icon size={17} strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-[0.95rem] tracking-tight">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {c.blurb}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="px-6 pb-24">
        <Reveal className="shadow-soft mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface px-8 py-14 text-center">
          <h2 className="text-2xl tracking-tight md:text-4xl">
            Have something worth building?
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
            Tell us the problem. We'll bring the engineering.
          </p>
          <div className="mt-7 flex justify-center">
            <MagneticButton to="/contact">
              Get in touch
              <ArrowRight size={15} />
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
