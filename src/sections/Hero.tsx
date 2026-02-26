import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const eyebrow = eyebrowRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;

    if (!hero || !image || !content) return;

    // Initial states
    gsap.set([eyebrow, title, subtitle, cta], { opacity: 0, y: 30 });

    // Entry animation timeline
    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(eyebrow, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
      .to(
        title,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      .to(
        subtitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      )
      .to(
        cta,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.5'
      );

    // Parallax effect on scroll
    const parallaxTrigger = ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(image, {
          y: self.progress * 150,
        });
        gsap.set(content, {
          opacity: 1 - self.progress * 1.5,
        });
      },
    });

    return () => {
      tl.kill();
      parallaxTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Ken Burns */}
      <div
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
      >
        <img
          src="/images/hero/hero-main.jpg"
          alt="Luxury rooftop infinity pool at sunset"
          className="w-full h-full object-cover animate-ken-burns"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6"
      >
        <p
          ref={eyebrowRef}
          className="caption-uppercase text-white/80 mb-6"
        >
          Luxury Destinations
        </p>

        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white mb-6"
        >
          Urban Escapes
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/90 max-w-xl mb-10"
        >
          City stays, reimagined by Aman
        </p>

        <a
          ref={ctaRef}
          href="#destinations"
          className="group inline-flex items-center gap-3 px-8 py-4 border border-white/50 text-white text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-white hover:text-[#1A1A1A]"
        >
          Discover more
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-white/30 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
