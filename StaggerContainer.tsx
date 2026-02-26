import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  duration?: number;
  y?: number;
  start?: string;
}

export function StaggerContainer({
  children,
  className,
  stagger = 0.1,
  duration = 0.8,
  y = 60,
  start = 'top 75%',
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    if (children.length === 0) return;

    const trigger = ScrollTrigger.create({
      trigger: container,
      start,
      onEnter: () => {
        if (!hasAnimated.current) {
          hasAnimated.current = true;
          gsap.fromTo(
            children,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              duration,
              stagger,
              ease: 'power2.out',
            }
          );
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [stagger, duration, y, start]);

  return (
    <div
      ref={containerRef}
      className={cn(className)}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </div>
  );
}
