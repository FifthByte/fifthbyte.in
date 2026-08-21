import { useEffect, useState } from "react"
import { motion, useSpring } from "motion/react"

export interface SmoothCursorProps {
  springConfig?: {
    damping: number
    stiffness: number
    mass: number
    restDelta: number
  }
}

const DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)"

function isTrackablePointer(pointerType: string) {
  return pointerType !== "touch"
}

export function SmoothCursor({
  springConfig = {
    damping: 24,
    stiffness: 280,
    mass: 0.55,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  // Direct fast spring for precision center dot (zero lag)
  const dotX = useSpring(0, { damping: 35, stiffness: 900, mass: 0.15 })
  const dotY = useSpring(0, { damping: 35, stiffness: 900, mass: 0.15 })

  // Fluid trailing spring for outer smooth ring
  const ringX = useSpring(0, springConfig)
  const ringY = useSpring(0, springConfig)

  useEffect(() => {
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY)

    const updateEnabled = () => {
      const nextIsEnabled = mediaQuery.matches
      setIsEnabled(nextIsEnabled)
      if (!nextIsEnabled) setIsVisible(false)
    }

    updateEnabled()
    mediaQuery.addEventListener("change", updateEnabled)
    return () => mediaQuery.removeEventListener("change", updateEnabled)
  }, [])

  useEffect(() => {
    if (!isEnabled) return

    const handlePointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) return
      setIsVisible(true)

      dotX.set(e.clientX)
      dotY.set(e.clientY)
      ringX.set(e.clientX)
      ringY.set(e.clientY)

      // Detect hover over interactive elements
      const target = e.target as HTMLElement | null
      if (target) {
        const interactive = target.closest(
          "a, button, input, textarea, select, [role='button'], .cursor-pointer, .group"
        )
        setIsHovered(!!interactive)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    document.body.style.cursor = "none"
    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.body.style.cursor = "auto"
    }
  }, [isEnabled, dotX, dotY, ringX, ringY])

  if (!isEnabled) return null

  return (
    <>
      {/* Outer Smooth Trailing Ring */}
      <motion.div
        style={{
          position: "fixed",
          left: ringX,
          top: ringY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "transform",
        }}
        initial={false}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.7 : isHovered ? 1.35 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 24 },
          opacity: { duration: 0.15 },
        }}
      >
        <div
          className={`h-5 w-5 rounded-full border transition-all duration-200 ${
            isHovered
              ? "border-cyan-400 bg-cyan-500/15 shadow-[0_0_12px_rgba(56,189,248,0.45)]"
              : "border-cyan-400/60 bg-transparent shadow-[0_0_6px_rgba(56,189,248,0.2)]"
          }`}
        />
      </motion.div>

      {/* Center Glowing Dot */}
      <motion.div
        style={{
          position: "fixed",
          left: dotX,
          top: dotY,
          translateX: "-50%",
          translateY: "-50%",
          zIndex: 10000,
          pointerEvents: "none",
          willChange: "transform",
        }}
        initial={false}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.6 : isHovered ? 1.25 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 600, damping: 30 },
          opacity: { duration: 0.1 },
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Subtle Ambient Glow */}
          <div
            className={`absolute h-2 w-2 rounded-full bg-cyan-400/50 blur-[2px] transition-all duration-200 ${
              isHovered ? "scale-150 bg-cyan-300/70" : ""
            }`}
          />
          {/* Solid Center Dot */}
          <div className="h-1 w-1 rounded-full bg-cyan-300 shadow-[0_0_4px_#38bdf8]" />
        </div>
      </motion.div>
    </>
  )
}
