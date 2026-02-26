import { useState, useEffect, useRef } from 'react';

export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY !== lastScrollY.current) {
            setScrollY(currentScrollY);
            setIsScrolled(currentScrollY > 50);
            lastScrollY.current = currentScrollY;
          }
          rafId.current = null;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return { scrollY, isScrolled };
}
