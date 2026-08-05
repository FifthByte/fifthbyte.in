import { Page, PageHeader } from "@/components/ui-kit/Page";
import { Stagger, StaggerItem } from "@/components/ui-kit/Reveal";
import { TechCategoryCard } from "@/components/technologies/TechCategoryCard";
import { techCategories } from "@/data/technologies";


export default function TechnologiesPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Technologies"
        title="A stack chosen, not collected."
        subtitle="Tools we know deeply enough to make fast decisions with."
      />

      <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
        {techCategories.map((category) => (
          <StaggerItem key={category.title}>
            <TechCategoryCard category={category} />
          </StaggerItem>
        ))}
      </Stagger>
    </Page>
  );
}
