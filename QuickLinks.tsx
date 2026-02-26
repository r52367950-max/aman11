import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { 
  Building2, 
  Compass, 
  Sparkles, 
  UtensilsCrossed, 
  Calendar, 
  Gift,
  ArrowRight 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface QuickLink {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  color: string;
}

const quickLinks: QuickLink[] = [
  {
    id: '1',
    title: 'Explore Hotels',
    description: 'Discover our collection of 35+ luxury properties worldwide',
    icon: Building2,
    href: '/hotels',
    color: 'bg-[#C9A962]',
  },
  {
    id: '2',
    title: 'Curated Journeys',
    description: 'Multi-destination experiences crafted just for you',
    icon: Compass,
    href: '/experiences',
    color: 'bg-[#6B6B6B]',
  },
  {
    id: '3',
    title: 'Spa & Wellness',
    description: 'Rejuvenating treatments inspired by ancient traditions',
    icon: Sparkles,
    href: '/spa',
    color: 'bg-[#8B7355]',
  },
  {
    id: '4',
    title: 'Dining Experiences',
    description: 'World-class cuisine at our signature restaurants',
    icon: UtensilsCrossed,
    href: '/dining',
    color: 'bg-[#9A9A9A]',
  },
  {
    id: '5',
    title: 'Special Events',
    description: 'Weddings, celebrations, and corporate gatherings',
    icon: Calendar,
    href: '/events',
    color: 'bg-[#B8984D]',
  },
  {
    id: '6',
    title: 'Gift Cards',
    description: 'The perfect gift for loved ones',
    icon: Gift,
    href: '/gift-cards',
    color: 'bg-[#7A7A7A]',
  },
];

export function QuickLinks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.quick-link-card');

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      onEnter: () => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
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
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#F5F0E8]">
      <div className="container-aman">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="caption-uppercase text-[#9A9A9A] mb-3">Quick Access</p>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-[#1A1A1A]">
            Begin Your Journey
          </h2>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {quickLinks.map((link) => (
            <Link
              key={link.id}
              to={link.href}
              className="quick-link-card opacity-0 group"
              onMouseEnter={() => setHoveredId(link.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  'relative h-full p-6 bg-white border border-[#E5E0D8] transition-all duration-300',
                  'hover:shadow-aman hover:border-[#C9A962]'
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    'w-12 h-12 flex items-center justify-center mb-4 transition-all duration-300',
                    link.color,
                    hoveredId === link.id ? 'scale-110' : ''
                  )}
                >
                  <link.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-serif text-[#1A1A1A] mb-2 group-hover:text-[#C9A962] transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] mb-4 line-clamp-2">
                  {link.description}
                </p>

                {/* Arrow */}
                <div className="flex items-center gap-1 text-xs text-[#9A9A9A] group-hover:text-[#C9A962] transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </div>

                {/* Hover Border Effect */}
                <div
                  className={cn(
                    'absolute bottom-0 left-0 h-1 bg-[#C9A962] transition-all duration-300',
                    hoveredId === link.id ? 'w-full' : 'w-0'
                  )}
                />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
