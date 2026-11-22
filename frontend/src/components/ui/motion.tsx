"use client";

import { motion } from "framer-motion";

/**
 * Staggered container for animating children one after another.
 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * Individual item variant for staggered animations.
 */
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/**
 * Page entrance animation variant.
 */
export const pageEnter = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * Card hover lift variant.
 */
export const cardHover = {
  whileHover: { y: -6, scale: 1.01 },
  whileTap: { scale: 0.98 },
  transition: { type: "spring", stiffness: 300, damping: 25 },
};

/**
 * Fade in variant.
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

/**
 * Slide up variant.
 */
export const slideUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/**
 * Wrapper that applies staggered animation to its children.
 */
export function StaggeredGrid({
  children,
  className,
  delayChildren = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.08, delayChildren },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
