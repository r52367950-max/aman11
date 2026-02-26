import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Anchor, Waves, Sun, Compass, Utensils, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: '50 Suites',
    description: 'Spacious suites with private terraces and ocean views',
    icon: Anchor,
  },
  {
    title: '183 Meters',
    description: 'Sleek, modern design with elegant lines',
    icon: Waves,
  },
  {
    title: 'Mediterranean',
    description: 'Curated journeys through the Mediterranean',
    icon: Compass,
  },
  {
    title: 'World-Class Dining',
    description: 'Multiple restaurants with panoramic sea views',
    icon: Utensils,
  },
  {
    title: 'Aman Spa',
    description: 'Full-service spa with ocean-view treatment rooms',
    icon: Sparkles,
  },
  {
    title: 'Sun Deck',
    description: 'Expansive deck with infinity pool and lounging areas',
    icon: Sun,
  },
];

const itineraries = [
  {
    name: 'Croatian Coast',
    duration: '7 nights',
    highlights: ['Dubrovnik', 'Hvar', 'Split', 'Kotor'],
  },
  {
    name: 'Greek Isles',
    duration: '10 nights',
    highlights: ['Santorini', 'Mykonos', 'Rhodes', 'Athens'],
  },
  {
    name: 'Italian Riviera',
    duration: '7 nights',
    highlights: ['Portofino', 'Cinque Terre', 'Porto Venere', 'Monaco'],
  },
];

export function AmanAtSeaPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.animate-in');
    if (!elements) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          elements,
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

    return () => trigger.kill();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Hero */}
      <div className="relative h-[80vh] overflow-hidden">
        <img
          src="/images/misc/aman-at-sea.jpg"
          alt="Aman at Sea"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="caption-uppercase text-white/70 mb-4">Coming 2026</p>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif font-light mb-6">
              Aman at Sea
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
              The serenity of Aman, now on the open waters
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div ref={sectionRef} className="container-aman py-20">
        <div className="max-w-4xl mx-auto text-center animate-in opacity-0">
          <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed mb-8">
            Amangati, Aman's first vessel, will soon embark on curated journeys through the 
            Mediterranean, bringing the serenity and service that define Aman to the open waters.
          </p>
          <p className="text-[#6B6B6B] leading-relaxed">
            Designed with the same attention to detail and commitment to excellence that defines 
            every Aman destination, this floating sanctuary offers an unparalleled maritime experience.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-[#9A9A9A] mb-4">The Vessel</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A]">
              Amangati
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 border border-[#E5E0D8] flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-[#C9A962]" />
                </div>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">{feature.title}</h3>
                <p className="text-[#6B6B6B] text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Itineraries */}
      <div className="bg-[#1A1A1A] text-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-white/50 mb-4">Journeys</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light">
              Curated Itineraries
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {itineraries.map((itinerary, index) => (
              <motion.div
                key={itinerary.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-white/20 p-8 hover:border-[#C9A962] transition-colors"
              >
                <h3 className="text-2xl font-serif mb-2">{itinerary.name}</h3>
                <p className="text-[#C9A962] text-sm mb-4">{itinerary.duration}</p>
                <div className="flex flex-wrap gap-2">
                  {itinerary.highlights.map((highlight) => (
                    <span key={highlight} className="px-2 py-1 bg-white/10 text-xs">
                      {highlight}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#F5F0E8] py-16">
        <div className="container-aman text-center">
          <h3 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] mb-4">
            Be the First to Know
          </h3>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Register your interest to receive updates about Aman at Sea and be among the first 
            to book when reservations open.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors"
          >
            Register Interest
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
