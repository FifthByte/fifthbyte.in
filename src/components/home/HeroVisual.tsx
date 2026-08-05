import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Activity, CheckCircle2, GitBranch } from "lucide-react";

const codeLines = [
  ["const", " byte", " = ", "deploy", "({"],
  ["  region:", " 'auto',"],
  ["  scale:", " 'edge',"],
  ["})"],
];

export function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const drift = useTransform(sx, [-0.5, 0.5], [14, -14]);

  return (
    <div
      aria-hidden
      onMouseMove={(e) => {
        if (reduce) return;
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative mx-auto aspect-square w-full max-w-[460px] [perspective:1200px]"
    >
      {/* gradient blobs */}
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.65, 0.5] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="bg-gradient-accent absolute top-6 left-8 size-64 rounded-full opacity-50 blur-[90px]"
      />
      <motion.div
        animate={{ scale: [1.05, 1, 1.05] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-4 bottom-10 size-56 rounded-full bg-cyan opacity-25 blur-[90px]"
      />

      {/* grid plane */}
      <motion.div
        style={{ rotateX, rotateY }}
        className="grid-lines absolute inset-6 rounded-3xl border border-border/70 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]"
      />

      {/* main glass card with code */}
      <motion.div
        style={{ rotateX, rotateY }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass shadow-float absolute top-[22%] left-[8%] w-[74%] rounded-2xl p-4"
      >
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="size-2 rounded-full bg-border" />
          <span className="ml-2 text-[0.6rem] tracking-wide text-muted-foreground">
            fifthbyte.config.ts
          </span>
        </div>
        <pre className="mt-3 font-mono text-[0.7rem] leading-6">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.12, duration: 0.35 }}
            >
              {line.map((token, j) => (
                <span
                  key={j}
                  className={j % 2 === 0 ? "text-foreground" : "text-muted-foreground"}
                >
                  {token}
                </span>
              ))}
            </motion.div>
          ))}
        </pre>
      </motion.div>

      {/* floating stat card */}
      <motion.div
        style={{ x: drift }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="glass shadow-float absolute top-[8%] right-0 flex items-center gap-2 rounded-xl px-3 py-2"
      >
        <Activity size={14} className="text-blue" />
        <span className="text-[0.7rem] font-medium">p95 · 42ms</span>
      </motion.div>

      <motion.div
        style={{ x: drift }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass shadow-float absolute bottom-[14%] left-0 flex items-center gap-2 rounded-xl px-3 py-2"
      >
        <GitBranch size={14} className="text-violet" />
        <span className="text-[0.7rem] font-medium">main · shipped</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass shadow-float absolute right-[6%] bottom-[4%] flex items-center gap-2 rounded-xl px-3 py-2"
      >
        <CheckCircle2 size={14} className="text-cyan" />
        <span className="text-[0.7rem] font-medium">100 / 100</span>
      </motion.div>
    </div>
  );
}
