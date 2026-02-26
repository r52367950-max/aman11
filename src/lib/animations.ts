import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Fade in animation
export const fadeIn = (
  element: gsap.TweenTarget,
  duration: number = 0.8,
  delay: number = 0
): gsap.core.Tween => {
  return gsap.fromTo(
    element,
    { opacity: 0 },
    { opacity: 1, duration, delay, ease: 'power2.out' }
  );
};

// Fade in up animation
export const fadeInUp = (
  element: gsap.TweenTarget,
  duration: number = 0.8,
  delay: number = 0,
  y: number = 40
): gsap.core.Tween => {
  return gsap.fromTo(
    element,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
  );
};

// Fade in down animation
export const fadeInDown = (
  element: gsap.TweenTarget,
  duration: number = 0.8,
  delay: number = 0,
  y: number = -40
): gsap.core.Tween => {
  return gsap.fromTo(
    element,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, delay, ease: 'power2.out' }
  );
};

// Fade in left animation
export const fadeInLeft = (
  element: gsap.TweenTarget,
  duration: number = 0.8,
  delay: number = 0,
  x: number = -40
): gsap.core.Tween => {
  return gsap.fromTo(
    element,
    { opacity: 0, x },
    { opacity: 1, x: 0, duration, delay, ease: 'power2.out' }
  );
};

// Fade in right animation
export const fadeInRight = (
  element: gsap.TweenTarget,
  duration: number = 0.8,
  delay: number = 0,
  x: number = 40
): gsap.core.Tween => {
  return gsap.fromTo(
    element,
    { opacity: 0, x },
    { opacity: 1, x: 0, duration, delay, ease: 'power2.out' }
  );
};

// Scale in animation
export const scaleIn = (
  element: gsap.TweenTarget,
  duration: number = 0.8,
  delay: number = 0,
  scale: number = 0.9
): gsap.core.Tween => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale },
    { opacity: 1, scale: 1, duration, delay, ease: 'power2.out' }
  );
};

// Stagger children animation
export const staggerChildren = (
  parent: gsap.TweenTarget,
  children: string,
  duration: number = 0.6,
  stagger: number = 0.1,
  y: number = 30
): gsap.core.Tween => {
  return gsap.fromTo(
    gsap.utils.selector(parent)(children),
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, stagger, ease: 'power2.out' }
  );
};

// Parallax animation
export const createParallax = (
  element: gsap.TweenTarget,
  speed: number = 0.5
): ScrollTrigger => {
  return ScrollTrigger.create({
    trigger: element as gsap.DOMTarget,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      gsap.set(element as gsap.DOMTarget, {
        y: self.progress * 100 * speed,
      });
    },
  });
};

// Reveal on scroll animation
export const revealOnScroll = (
  element: gsap.TweenTarget,
  options: {
    start?: string;
    once?: boolean;
    y?: number;
    duration?: number;
  } = {}
): ScrollTrigger => {
  const { start = 'top 80%', once = true, y = 40, duration = 0.8 } = options;

  return ScrollTrigger.create({
    trigger: element as gsap.DOMTarget,
    start,
    once,
    onEnter: () => {
      gsap.fromTo(
        element as gsap.DOMTarget,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration, ease: 'power2.out' }
      );
    },
  });
};

// Text reveal animation (character by character)
export const textReveal = (
  element: HTMLElement,
  duration: number = 0.05,
  stagger: number = 0.02
): gsap.core.Timeline => {
  const text = element.textContent || '';
  element.innerHTML = text
    .split('')
    .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
    .join('');

  const chars = element.querySelectorAll('span');
  
  return gsap
    .timeline()
    .fromTo(
      chars,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration, stagger, ease: 'power2.out' }
    );
};

// Magnetic button effect
export const magneticButton = (
  button: HTMLElement,
  strength: number = 0.3
): (() => void) => {
  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(button, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  button.addEventListener('mousemove', handleMouseMove);
  button.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    button.removeEventListener('mousemove', handleMouseMove);
    button.removeEventListener('mouseleave', handleMouseLeave);
  };
};

// Smooth scroll to element
export const smoothScrollTo = (
  target: string | HTMLElement,
  offset: number = 0,
  duration: number = 1
): void => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    
    gsap.to(window, {
      scrollTo: { y: top },
      duration,
      ease: 'power2.inOut',
    });
  }
};

// Counter animation
export const animateCounter = (
  element: HTMLElement,
  endValue: number,
  duration: number = 2,
  suffix: string = ''
): gsap.core.Tween => {
  const obj = { value: 0 };
  
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toString() + suffix;
    },
  });
};

// Image reveal animation
export const imageReveal = (
  container: HTMLElement,
  image: HTMLElement,
  duration: number = 1.2
): gsap.core.Timeline => {
  return gsap
    .timeline()
    .fromTo(
      container,
      { clipPath: 'inset(0 100% 0 0)' },
      { clipPath: 'inset(0 0% 0 0)', duration, ease: 'power3.inOut' }
    )
    .fromTo(
      image,
      { scale: 1.3 },
      { scale: 1, duration: duration * 1.2, ease: 'power2.out' },
      0
    );
};

// Horizontal scroll animation
export const horizontalScroll = (
  container: HTMLElement,
  sections: HTMLElement[],
  options: {
    duration?: number;
    ease?: string;
  } = {}
): ScrollTrigger => {
  const { duration = 1, ease = 'none' } = options;

  gsap.set(sections, { display: 'flex', flexWrap: 'nowrap' });

  const totalWidth = sections.reduce((acc, section) => acc + section.offsetWidth, 0);

  return ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: () => `+=${totalWidth}`,
    pin: true,
    scrub: 1,
    anticipatePin: 1,
    animation: gsap.to(sections, {
      x: () => -(totalWidth - window.innerWidth),
      duration,
      ease,
    }),
  });
};

// Page transition animations
export const pageTransitions = {
  fade: (element: gsap.TweenTarget): gsap.core.Tween => {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  },
  
  slideUp: (element: gsap.TweenTarget): gsap.core.Tween => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
    );
  },
  
  slideLeft: (element: gsap.TweenTarget): gsap.core.Tween => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    );
  },
  
  scale: (element: gsap.TweenTarget): gsap.core.Tween => {
    return gsap.fromTo(
      element,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
    );
  },
};

// Easing functions
export const easings = {
  smooth: 'power2.out',
  bounce: 'bounce.out',
  elastic: 'elastic.out(1, 0.3)',
  back: 'back.out(1.7)',
  circ: 'circ.out',
  expo: 'expo.out',
  slow: 'power4.out',
};

// Animation presets for common use cases
export const animationPresets = {
  heroText: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: easings.smooth },
  },
  
  cardReveal: {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: easings.smooth },
  },
  
  imageReveal: {
    initial: { opacity: 0, scale: 1.1 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.2, ease: easings.smooth },
  },
  
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: easings.smooth },
  },
};

// Prefers reduced motion check
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Safe animation wrapper
export const safeAnimation = (
  animation: () => gsap.core.Tween | gsap.core.Timeline | ScrollTrigger
): gsap.core.Tween | gsap.core.Timeline | ScrollTrigger | null => {
  if (prefersReducedMotion()) {
    return null;
  }
  return animation();
};
