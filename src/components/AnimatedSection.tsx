import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  start?: string;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  duration = 0.8,
  y = 40,
  start = 'top 80%',
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start,
      onEnter: () => {
        if (!hasAnimated.current) {
          hasAnimated.current = true;
          gsap.fromTo(
            element,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: 'power2.out',
            }
          );
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, duration, y, start]);

  return (
    <div
      ref={sectionRef}
      className={cn('opacity-0', className)}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </div>
  );
}
