import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { HotelCard } from '@/components/HotelCard';
import type { Hotel } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const hotels: Hotel[] = [
  {
    id: '1',
    name: 'Aman New York',
    location: 'New York, USA',
    description:
      "East meets West in Manhattan's landmark Crown Building, where the city's original architectural splendour and Aman's harmonious design language collide.",
    image: '/images/hotels/aman-new-york.jpg',
    slug: 'aman-new-york',
  },
  {
    id: '2',
    name: 'Aman Tokyo',
    location: 'Tokyo, Japan',
    description:
      'A peaceful sanctuary atop the Otemachi Tower, offering panoramic city views and traditional Japanese design elements.',
    image: '/images/hotels/aman-tokyo.jpg',
    slug: 'aman-tokyo',
  },
  {
    id: '3',
    name: 'Amangiri',
    location: 'Utah, USA',
    description:
      'Sacred space in the Utah desert, where dramatic rock formations meet minimalist architecture for a transformative experience.',
    image: '/images/hotels/amangiri.jpg',
    slug: 'amangiri',
  },
  {
    id: '4',
    name: 'Amanpuri',
    location: 'Phuket, Thailand',
    description:
      'Place of peace on Phuket\'s west coast, surrounded by coconut palms and overlooking the azure Andaman Sea.',
    image: '/images/hotels/amanpuri.jpg',
    slug: 'amanpuri',
  },
  {
    id: '5',
    name: 'Aman Venice',
    location: 'Venice, Italy',
    description:
      'Palazzo magnificence on the Grand Canal, where Renaissance art and architecture create an atmosphere of timeless elegance.',
    image: '/images/hotels/aman-venice.jpg',
    slug: 'aman-venice',
  },
  {
    id: '6',
    name: 'Amanzoe',
    location: 'Peloponnese, Greece',
    description:
      'Ancient hilltop heritage in the Peloponnese, surrounded by olive groves with views of the Aegean Sea.',
    image: '/images/hotels/amanzoe.jpg',
    slug: 'amanzoe',
  },
];

export function HotelsShowcase() {
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
            stagger: 0.15,
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
      id="destinations"
      ref={sectionRef}
      className="section-padding bg-[#F5F0E8]"
    >
      <div className="container-aman">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <p className="caption-uppercase text-[#9A9A9A] mb-4">
            Hotels & Resorts
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#1A1A1A] mb-6">
            Explore the World of Aman
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed mb-8">
            Uncover new horizons with Aman – from soul-soothing escapes by the
            coast to transformational journeys that awaken the spirit – across 35
            hotels and resorts in 20 countries.
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-3 text-[#1A1A1A] text-xs tracking-[0.15em] uppercase hover:text-[#C9A962] transition-colors duration-300"
          >
            Discover more
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {hotels.map((hotel, index) => (
            <HotelCard key={hotel.id} hotel={hotel} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
