import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NewsletterForm } from '@/components/NewsletterForm';

gsap.registerPlugin(ScrollTrigger);

export function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const trigger = ScrollTrigger.create({
      trigger: content,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          content.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          }
        );
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#F5F0E8]">
      <div className="container-aman">
        <div
          ref={contentRef}
          className="max-w-2xl mx-auto text-center opacity-0"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-[#1A1A1A] mb-6">
            Get inspired
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed mb-10">
            To receive updates about exclusive experiences, events, new
            destinations and more, please register your interest.
          </p>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
