'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up' 
}: AnimatedSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const directionVariants = {
    up: { y: isMobile ? 20 : 50, opacity: 0 },
    down: { y: isMobile ? -20 : -50, opacity: 0 },
    left: { x: isMobile ? -20 : -50, opacity: 0 },
    right: { x: isMobile ? 20 : 50, opacity: 0 }
  };

  return (
    <motion.div
      className={className}
      initial={directionVariants[direction]}
      whileInView={{ y: 0, x: 0, opacity: 1 }}
      viewport={{ once: true, amount: isMobile ? 0.1 : 0.3 }}
      transition={{
        duration: isMobile ? 0.3 : 0.6,
        delay: isMobile ? delay * 0.5 : delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
      style={{ backgroundColor: 'inherit' }}
    >
      {children}
    </motion.div>
  );
}