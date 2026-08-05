import { motion } from "motion/react";
import { navItems } from "@/lib/nav";
import { Link, useLocation } from "react-router-dom";


export function BottomNav() {
  const pathname = useLocation().pathname;

  return (
    <nav
      aria-label="Mobile"
      className="glass shadow-float fixed inset-x-0 bottom-0 z-50 rounded-t-3xl px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <ul className="flex items-stretch justify-between">
        {navItems.map((item) => {
          const active = pathname === item.to;
          const Icon = item.icon;
          return (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                aria-current={active ? "page" : undefined}
                className="relative flex flex-col items-center gap-1 rounded-2xl px-1 py-2"
              >
                {active && (
                  <motion.span
                    layoutId="bottom-nav-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-2xl bg-surface"
                  />
                )}
                <motion.span
                  animate={{ y: active ? -1 : 0, scale: active ? 1.06 : 1 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  <Icon
                    size={19}
                    strokeWidth={active ? 2.2 : 1.7}
                    className={active ? "text-foreground" : "text-muted-foreground"}
                  />
                </motion.span>
                <span
                  className={`relative text-[0.625rem] font-medium tracking-tight ${
                    active ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
                {active && (
                  <motion.span
                    layoutId="bottom-nav-indicator"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="bg-gradient-accent absolute -top-2 h-1 w-8 rounded-full"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
