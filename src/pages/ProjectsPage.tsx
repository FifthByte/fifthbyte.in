import { Page, PageHeader } from "@/components/ui-kit/Page";
import { Stagger, StaggerItem } from "@/components/ui-kit/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";


export default function ProjectsPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Projects"
        title="Products we've shipped."
        subtitle="A selection of platforms, dashboards, and AI systems built end to end."
      />

      <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <StaggerItem key={project.slug}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </Page>
  );
}
