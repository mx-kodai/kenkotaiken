'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

export default function AnimatedCard({ 
  children, 
  className = '', 
  delay = 0,
  index = 0
}: AnimatedCardProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: 30, opacity: 0, scale: 0.95 }}
      whileInView={{ y: 0, opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: delay + (index * 0.1),
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.div>
  );
}