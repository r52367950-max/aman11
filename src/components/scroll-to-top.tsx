import { useEffect, useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
  variant?: 'default' | 'minimal';
}

export function ScrollToTopButton({
  threshold = 400,
  className,
  variant = 'default',
}: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (variant === 'minimal') {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className={cn(
              'fixed bottom-6 right-6 z-50 w-10 h-10',
              'bg-white/90 backdrop-blur-sm border border-gray-200',
              'flex items-center justify-center',
              'hover:bg-gray-50 transition-colors shadow-lg',
              className
            )}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className={cn(
            'fixed bottom-8 right-8 z-50',
            'flex items-center gap-2 px-4 py-3',
            'bg-[#1A1A1A] text-white',
            'hover:bg-[#333] transition-colors',
            'shadow-lg',
            className
          )}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
          <span className="text-sm tracking-wide">Back to Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Hook for scroll progress
export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setProgress(progress);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return progress;
}

// Scroll progress bar component
interface ScrollProgressBarProps {
  className?: string;
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

export function ScrollProgressBar({
  className,
  color = '#C9A962',
  height = 3,
  position = 'top',
}: ScrollProgressBarProps) {
  const progress = useScrollProgress();

  return (
    <div
      className={cn(
        'fixed left-0 right-0 z-50',
        position === 'top' ? 'top-0' : 'bottom-0',
        className
      )}
      style={{ height }}
    >
      <div
        className="h-full transition-all duration-100"
        style={{
          width: `${progress}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}

// Smooth scroll link component
interface SmoothScrollLinkProps {
  to: string;
  children: React.ReactNode;
  offset?: number;
  className?: string;
  onClick?: () => void;
}

export function SmoothScrollLink({
  to,
  children,
  offset = 80,
  className,
  onClick,
}: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const element = document.querySelector(to);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    
    onClick?.();
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}

// Intersection observer hook for scroll animations
interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
): [(node: T | null) => void, boolean] {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const [ref, setRef] = useState<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(ref);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin, triggerOnce]);

  return [setRef, isInView];
}

// Animated section component
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn';
  delay?: number;
  duration?: number;
  threshold?: number;
}

export function AnimatedSection({
  children,
  className,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const [ref, isInView] = useScrollAnimation<HTMLDivElement>({ threshold });

  const animations = {
    fadeIn: {
      opacity: isInView ? 1 : 0,
    },
    fadeInUp: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(40px)',
    },
    fadeInLeft: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateX(0)' : 'translateX(-40px)',
    },
    fadeInRight: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateX(0)' : 'translateX(40px)',
    },
    scaleIn: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'scale(1)' : 'scale(0.95)',
    },
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...animations[animation],
        transition: `all ${duration}s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// Parallax wrapper component
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      
      if (scrolled > 0 && rect.bottom > 0) {
        setOffset(scrolled * speed * 0.1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}
