import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Page({ children }: { children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-5xl px-6 pt-28 pb-10 md:pt-32 md:pb-14">
      {children}
    </main>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
}) {
  return (
    <Reveal className="max-w-2xl">
      <p className="text-gradient text-xs font-semibold tracking-[0.18em] uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-4 text-4xl leading-[1.05] md:text-5xl">{title}</h1>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </Reveal>
  );
}
