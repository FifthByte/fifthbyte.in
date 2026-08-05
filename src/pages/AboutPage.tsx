import { Page, PageHeader } from "@/components/ui-kit/Page";
import { Stagger,StaggerItem } from "@/components/ui-kit/Reveal";

const principles = [
  { title: "Precision", body: "We measure twice and cut once. Every line of code serves a specific business purpose." },
  { title: "Velocity", body: "Startup speed with enterprise reliability. We ship fast without breaking things." },
  { title: "Integrity", body: "Security and stability aren't afterthoughts; they are the foundation of our work." },
  { title: "Collaboration", body: "We don't work for you; we work with you as an extension of your own team." },
];


export default function AboutPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="About"
        title={
          <>
            Build software that solves <span className="text-gradient">real problems</span>.
          </>
        }
        subtitle="That's the whole philosophy. Everything else follows from it."
      />

      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2">
        {principles.map((p) => (
          <StaggerItem
            key={p.title}
            className="shadow-soft rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="text-lg tracking-tight">{p.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
          </StaggerItem>
        ))}
      </Stagger>

      <Stagger className="mt-6 grid gap-5">
        <StaggerItem className="rounded-2xl border border-border bg-surface p-8">
          <p className="max-w-xl text-lg leading-relaxed tracking-tight">
            Have a vision? We have the execution. Let's design and engineer your next-generation software architecture.
          </p>
        </StaggerItem>
      </Stagger>
    </Page>
  );
}
