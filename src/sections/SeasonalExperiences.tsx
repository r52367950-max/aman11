import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExperienceCard } from '@/components/ExperienceCard';
import type { Experience } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const experiences: Experience[] = [
  {
    id: '1',
    category: 'In the Mountains',
    title: 'Alpine Awakening',
    description:
      'At Aman destinations in France and Italy, the winter season welcomes ski adventures.',
    image: '/images/experiences/alpine-awakening.jpg',
  },
  {
    id: '2',
    category: 'Winter Sun',
    title: 'Chasing Sunlight',
    description:
      'Discover a curated collection of winter sun retreats with Aman.',
    image: '/images/experiences/winter-sun.jpg',
  },
  {
    id: '3',
    category: 'City Escapes',
    title: 'Urban Discovery',
    description:
      'The gilded city skyline presents opportunities for cultural discovery at every turn.',
    image: '/images/experiences/city-escape.jpg',
  },
  {
    id: '4',
    category: 'Nature',
    title: 'To the Wilds',
    description:
      'Venture out of the ordinary with a stay immersed in Aman\'s most remote camp and safari settings.',
    image: '/images/experiences/to-the-wilds.jpg',
  },
];

export function SeasonalExperiences() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const trigger = ScrollTrigger.create({
      trigger: header,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          header.children,
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
    <section
      id="experiences"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container-aman">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left - Text Content */}
          <div ref={headerRef} className="lg:sticky lg:top-32">
            <p className="caption-uppercase text-[#9A9A9A] mb-4">
              New & Noteworthy
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#1A1A1A] mb-6">
              Seasonal Experiences
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed max-w-md">
              Across the Aman world, discover new and noteworthy experiences
              that provide an authentic connection to the soul of a place.
            </p>

            {/* Decorative Element */}
            <div className="mt-12 hidden lg:block">
              <div className="w-24 h-px bg-[#C9A962]" />
              <p className="mt-4 text-sm text-[#9A9A9A] italic">
                "Travel is the only thing you buy that makes you richer."
              </p>
            </div>
          </div>

          {/* Right - Experience Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
                variant={index === 0 ? 'large' : 'default'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
