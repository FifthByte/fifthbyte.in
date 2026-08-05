import { ArrowUpRight, Mail } from "lucide-react";
import { Page, PageHeader } from "@/components/ui-kit/Page";
import { Reveal, Stagger, StaggerItem } from "@/components/ui-kit/Reveal";
import { MagneticButton } from "@/components/ui-kit/MagneticButton";
import { social } from "@/lib/nav";
import {FaGithub, FaLinkedin} from 'react-icons/fa';


const links = [
  { label: "Email", value: social.email, href: `mailto:${social.email}`, icon: Mail },
  { label: "LinkedIn", value: "/company/fifthbyte", href: social.linkedin, icon: FaLinkedin },
  { label: "GitHub", value: "/fifthbyte", href: social.github, icon: FaGithub },
];


export default function ContactPage() {
  return (
    <Page>
      <PageHeader
        eyebrow="Contact"
        title="Let's build something."
        subtitle="Send a short note about what you're building. We reply within a day."
      />

      <Reveal delay={0.1} className="mt-8">
        <MagneticButton href={`mailto:${social.email}`}>
          Start a project
          <ArrowUpRight size={15} />
        </MagneticButton>
      </Reveal>

      <Stagger className="mt-14 grid gap-4 sm:grid-cols-3">
        {links.map(({ label, value, href, icon: Icon }) => (
          <StaggerItem key={label}>
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group shadow-soft hover:shadow-lift block rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="grid size-9 place-items-center rounded-xl border border-border bg-surface">
                <Icon size={16} strokeWidth={1.8} />
              </span>
              <p className="mt-4 text-sm font-medium tracking-tight">{label}</p>
              <p className="mt-0.5 truncate text-sm text-muted-foreground">{value}</p>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </Page>
  );
}
