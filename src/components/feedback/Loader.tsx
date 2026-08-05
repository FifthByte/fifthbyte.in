"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
// import "./App.css";

type LoaderProps = {
  onFinish?: () => void;
};

export default function Loader({ onFinish }: LoaderProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        onFinish?.();
      }, 600);

    }, 1800);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loader"
          exit={{
            opacity: 0,
            scale: 1.2,
            transition: {
              duration: 0.6
            }
          }}
        >
          <motion.img
            src="/fb_logo.png"
            alt="Fifth Byte"
            className="logo"
            initial={{
              scale: 0.6,
              opacity: 0
            }}
            animate={{
              scale: [0.6, 1.05, 1],
              opacity: 1,
              rotate: [0, -3, 3, 0]
            }}
            transition={{
              duration: 1.2,
              ease: "easeOut"
            }}
          />

          <motion.div
            className="glow"
            animate={{
              scale: [0.8, 1.4, 0.8],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />

          <motion.div
            className="ring"
            animate={{
              rotate: 360
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 6
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}