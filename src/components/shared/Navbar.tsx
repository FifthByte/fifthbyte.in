import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { navItems } from "@/lib/nav";
import { MagneticButton } from "../ui-kit/MagneticButton";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useLocation().pathname;

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    setHidden(y > prev && y > 120);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-140%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 hidden justify-center px-6 pt-4 md:flex"
    >
      <nav
        aria-label="Main"
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300 ${
          scrolled ? "glass shadow-float" : "border border-transparent"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 px-1" aria-label="Fifth Byte home">
          <img src="/fb_text_logo.png" className="w-40 h-auto" alt="" />
        </Link>

        <ul className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = pathname === item.to;
            return (
              <li key={item.to} className="relative">
                <Link
                  to={item.to}
                  className={`relative block rounded-lg px-3 py-1.5 text-sm transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-gradient-accent absolute inset-x-3 -bottom-0.5 h-px rounded-full"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <MagneticButton to="/contact" size="sm">
          Start a project
        </MagneticButton>
      </nav>
    </motion.header>
  );
}
