import { Mail } from "lucide-react";
import { social } from "@/lib/nav";
import {FaGithub, FaLinkedin} from 'react-icons/fa';


export function Footer() {
  return (
    <footer className="border-t border-border px-6 pb-22 pt-10 md:py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 sm:flex-row">
        {/* <Logo /> */}
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Fifth Byte. All rights reserved.
        </p>
        <div className="flex items-center gap-1">
          {[
            { href: `mailto:${social.email}`, icon: Mail, label: "Email" },
            { href: social.linkedin, icon: FaLinkedin, label: "LinkedIn" },
            { href: social.github, icon: FaGithub, label: "GitHub" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="grid size-9 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
