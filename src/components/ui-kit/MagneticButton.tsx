import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  className?: string;
};

const base =
  "relative inline-flex items-center justify-center gap-1.5 rounded-xl font-medium tracking-tight transition-colors will-change-transform";
const variants = {
  primary: "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90",
  ghost: "border border-border bg-background text-foreground hover:bg-surface",
};
const sizes = { sm: "px-3.5 py-2 text-[0.8rem]", md: "px-5 py-2.5 text-sm" };

export function MagneticButton({
  children,
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setOffset({
      x: ((e.clientX - (r.left + r.width / 2)) / r.width) * 12,
      y: ((e.clientY - (r.top + r.height / 2)) / r.height) * 10,
    });
  };

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      animate={{ x: offset.x, y: offset.y }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.span>
  );

  if (to) return <Link to={to}>{inner}</Link>;
  if (href)
    return (
      <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  return inner;
}
