import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      id="scroll-progress-bar"
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0066FF] via-[#00F0FF] to-[#9333EA] origin-left z-50 pointer-events-none shadow-[0_0_8px_rgba(0,240,255,0.6)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};
