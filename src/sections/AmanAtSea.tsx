import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function AmanAtSea() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    // Parallax effect on image
    const parallaxTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(image, {
          y: self.progress * 80 - 40,
        });
      },
    });

    // Content reveal
    const contentTrigger = ScrollTrigger.create({
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
      parallaxTrigger.kill();
      contentTrigger.kill();
    };
  }, []);

  return (
    <section
      id="aman-at-sea"
      ref={sectionRef}
      className="section-padding bg-[#F5F0E8] overflow-hidden"
    >
      <div className="container-aman">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image with Parallax */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
              <img
                src="/images/misc/aman-at-sea.jpg"
                alt="Aman at Sea - Luxury Yacht"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#C9A962] -z-10 hidden lg:block" />
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="lg:pl-8">
            <p className="caption-uppercase text-[#9A9A9A] mb-4">
              The World of Aman
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#1A1A1A] mb-6">
              Aman at Sea
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-8 max-w-md">
              Aman at Sea's first vessel, Amangati will soon embark on a curated
              suite of Mediterranean journeys, bringing the serenity of Aman to
              the open waters.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed mb-10 max-w-md">
              Designed with the same attention to detail and commitment to
              excellence that defines every Aman destination, this floating
              sanctuary offers an unparalleled maritime experience.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div>
                <p className="text-3xl font-serif font-light text-[#C9A962] mb-1">183m</p>
                <p className="text-sm text-[#9A9A9A]">Length</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-light text-[#C9A962] mb-1">50</p>
                <p className="text-sm text-[#9A9A9A]">Suites</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-light text-[#C9A962] mb-1">2026</p>
                <p className="text-sm text-[#9A9A9A]">Launch</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-light text-[#C9A962] mb-1">
                  Mediterranean
                </p>
                <p className="text-sm text-[#9A9A9A]">Itinerary</p>
              </div>
            </div>

            <a
              href="#"
              className="group inline-flex items-center gap-3 btn-secondary"
            >
              Discover more
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
