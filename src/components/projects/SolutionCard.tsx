import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface SolutionCardProps {
  index: number;
  name: string;
  description: string;
  icon?: IconType;
}

export default function SolutionCard({
  index,
  name,
  description,
  icon: Icon,
}: SolutionCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden md:h-85 h-75 rounded-3xl border border-neutral-200 bg-white p-8 transition-all duration-300 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-100"
    >
      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-violet-200/40 via-blue-200/20 to-cyan-200/30 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Background Icon */}
      {Icon && (
        <motion.div
          initial={{ scale: 1, rotate: -12 }}
          whileHover={{
            scale: 1.08,
            rotate: -6,
            x: -8,
            y: 6,
          }}
          transition={{ duration: 0.4 }}
          className="pointer-events-none absolute -right-6 -bottom-6"
        >
          <Icon
            className="h-32 w-32 text-violet-500/5 transition-colors duration-300 group-hover:text-violet-500/10"
          />
        </motion.div>
      )}

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-wider text-neutral-400">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
          {name}
        </h3>

        <p className="mb-6 leading-7 text-neutral-600">
          {description}
        </p>

        <div className="mt-auto">
          <Link to={"/projects"} className="inline-flex items-center gap-2 font-medium text-violet-700 transition-all duration-300 group-hover:gap-3">
            Explore
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}