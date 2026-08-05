import { Page, PageHeader } from "@/components/ui-kit/Page";
import { Stagger,StaggerItem } from "@/components/ui-kit/Reveal";

const principles = [
  { title: "Fast", body: "Performance is a feature. We measure it, then defend it." },
  { title: "Reliable", body: "Systems that behave the same on day one and day one thousand." },
  { title: "Scalable", body: "Architecture that grows without a rewrite." },
  { title: "Maintainable", body: "Code the next engineer can read and trust." },
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

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2">
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
            We work in small, senior teams. Fewer meetings, shorter feedback loops, and
            software shipped in weeks — not quarters.
          </p>
        </StaggerItem>
      </Stagger>
    </Page>
  );
}
