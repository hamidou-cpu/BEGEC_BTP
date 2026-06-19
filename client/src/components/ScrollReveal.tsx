import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  className?: string;
}

const variants: Record<Direction, { hidden: object; visible: object }> = {
  up:    { hidden: { opacity: 0, y: 48 },        visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -48 },       visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -56 },       visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 56 },        visible: { opacity: 1, x: 0 } },
  fade:  { hidden: { opacity: 0 },               visible: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.88 },  visible: { opacity: 1, scale: 1 } },
};

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.55,
  className,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-72px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[direction]}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
