import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface GiftCardProps {
  label: string;
  title: string;
  description: string;
  image: string;
  cta: string;
  index: number;
}

function GiftCard({ label, title, description, image, cta, index }: GiftCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
          }
        );
      },
      once: true,
    });

    return () => {
      trigger.kill();
    };
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer opacity-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E5E0D8] mb-6">
        <img
          src={image}
          alt={title}
          className={cn(
            'w-full h-full object-cover transition-transform duration-700',
            isHovered ? 'scale-105' : 'scale-100'
          )}
          loading="lazy"
        />
        {/* Overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-black/10 transition-opacity duration-500',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <p className="caption-uppercase text-[#9A9A9A]">{label}</p>
        <h3 className="text-2xl md:text-3xl font-serif font-light text-[#1A1A1A] group-hover:text-[#C9A962] transition-colors duration-300">
          {title}
        </h3>
        <p className="text-[#6B6B6B] leading-relaxed">{description}</p>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-[#1A1A1A] text-xs tracking-[0.15em] uppercase pt-2 hover:text-[#C9A962] transition-colors duration-300"
        >
          {cta}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  );
}

export function GiftEssentials() {
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
      id="gift-cards"
      ref={sectionRef}
      className="section-padding bg-white"
    >
      <div className="container-aman">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <p className="caption-uppercase text-[#9A9A9A] mb-4">
            Thoughtful Gestures
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-[#1A1A1A] mb-6">
            Gifts from Aman
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed">
            Prompting new adventures and serene indulgences, discover the perfect
            token of gratitude.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <GiftCard
            label="Aman Gift Card"
            title="Thoughtful Gestures"
            description="Prompting new adventures, Aman Gift Cards are the perfect token of gratitude for loved ones, available in customizable denominations."
            image="/images/misc/gift-card.jpg"
            cta="Shop now"
            index={0}
          />
          <GiftCard
            label="Aman Essentials"
            title="The Official Aman Shop"
            description="Discover serene indulgences from Aman Essentials, spanning skincare, homeware and fine fragrance crafted with natural ingredients."
            image="/images/misc/aman-essentials.jpg"
            cta="Shop now"
            index={1}
          />
        </div>
      </div>
    </section>
  );
}
