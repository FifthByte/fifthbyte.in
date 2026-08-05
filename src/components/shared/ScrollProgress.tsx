import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.2 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="bg-gradient-accent fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
    />
  );
}
