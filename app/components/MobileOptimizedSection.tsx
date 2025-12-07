'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface MobileOptimizedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function MobileOptimizedSection({ 
  children, 
  className = '', 
  delay = 0, 
  direction = 'up' 
}: MobileOptimizedSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // SSRの際は静的なコンテンツを返す
  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  // モーション設定を無効にするか、モバイルで軽減する
  if (shouldReduceMotion || isMobile) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0.8 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{
          duration: 0.2,
          delay: 0
        }}
      >
        {children}
      </motion.div>
    );
  }

  const directionVariants = {
    up: { y: 30, opacity: 0 },
    down: { y: -30, opacity: 0 },
    left: { x: -30, opacity: 0 },
    right: { x: 30, opacity: 0 }
  };

  return (
    <motion.div
      className={className}
      initial={directionVariants[direction]}
      whileInView={{ y: 0, x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75]
      }}
    >
      {children}
    </motion.div>
  );
}