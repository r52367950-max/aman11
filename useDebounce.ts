import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook for debouncing a value
 * @param value The value to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook for debouncing a callback function
 * @param callback The function to debounce
 * @param delay The delay in milliseconds
 * @returns The debounced function
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

/**
 * Hook for throttling a callback function
 * @param callback The function to throttle
 * @param limit The time limit in milliseconds
 * @returns The throttled function
 */
export function useThrottledCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  limit: number
): (...args: Parameters<T>) => void {
  const lastRunRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastRunRef.current >= limit) {
        lastRunRef.current = now;
        callback(...args);
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          lastRunRef.current = Date.now();
          callback(...args);
        }, limit - (now - lastRunRef.current));
      }
    },
    [callback, limit]
  );
}

/**
 * Hook for detecting when user stops typing
 * @param value The value to watch
 * @param delay The delay in milliseconds
 * @returns Whether the user has stopped typing
 */
export function useTypingStatus(value: string, delay: number = 500): boolean {
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsTyping(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return isTyping;
}

/**
 * Hook for handling window resize with debounce
 * @param delay The delay in milliseconds
 * @returns The current window dimensions
 */
export function useWindowSize(delay: number = 250): { width: number; height: number } {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const debouncedSetWindowSize = useDebouncedCallback(
    (width: unknown, height: unknown) => {
      setWindowSize({ width: width as number, height: height as number });
    },
    delay
  );

  useEffect(() => {
    const handleResize = () => {
      debouncedSetWindowSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [debouncedSetWindowSize]);

  return windowSize;
}

/**
 * Hook for handling scroll position with throttle
 * @returns The current scroll position
 */
export function useScrollPosition(): { x: number; y: number } {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  const throttledSetScrollPosition = useThrottledCallback(
    (x: unknown, y: unknown) => {
      setScrollPosition({ x: x as number, y: y as number });
    },
    100
  );

  useEffect(() => {
    const handleScroll = () => {
      throttledSetScrollPosition(window.scrollX, window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [throttledSetScrollPosition]);

  return scrollPosition;
}

/**
 * Hook for handling intersection observer
 * @param options IntersectionObserver options
 * @returns Ref callback and intersection state
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {}
): [(node: T | null) => void, boolean, IntersectionObserverEntry | null] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const nodeRef = useRef<T | null>(null);

  const setRef = useCallback(
    (node: T | null) => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      nodeRef.current = node;

      if (node) {
        observerRef.current = new IntersectionObserver(([entry]) => {
          setIsIntersecting(entry.isIntersecting);
          setEntry(entry);
        }, options);

        observerRef.current.observe(node);
      }
    },
    [options]
  );

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return [setRef, isIntersecting, entry];
}
