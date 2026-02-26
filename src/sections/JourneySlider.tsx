import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import type { Journey } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const journeys: Journey[] = [
  {
    id: '1',
    title: 'Bali to Java',
    subtitle: 'Temples & Traditions',
    description:
      'Journey through Indonesia\'s spiritual heartland, from ancient temples to volcanic landscapes.',
    image: '/images/journeys/bali-temple.jpg',
  },
  {
    id: '2',
    title: 'Bhutan',
    subtitle: 'The Last Shangri-La',
    description:
      'Discover the mystical kingdom where Gross National Happiness reigns supreme.',
    image: '/images/journeys/bhutan-tigers-nest.webp',
  },
  {
    id: '3',
    title: 'Sri Lanka',
    subtitle: 'Ancient Kingdoms',
    description:
      'Explore UNESCO World Heritage sites and wildlife sanctuaries across the pearl of the Indian Ocean.',
    image: '/images/journeys/sri-lanka-sigiriya.jpg',
  },
];

export function JourneySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance slides
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % journeys.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + journeys.length) % journeys.length);
  }, []);

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  // Header animation
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

  const currentJourney = journeys[currentIndex];

  return (
    <section
      id="journeys"
      ref={sectionRef}
      className="section-padding bg-[#1A1A1A] text-white"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="container-aman">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="caption-uppercase text-white/60 mb-4">
            Multi-Destination Journeys
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6">
            Pathways to Discovery
          </h2>
          <p className="text-white/70 leading-relaxed">
            Aman's multi-destination journeys uncover the world at its most
            awe-inspiring.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Main Image */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <img
                  src={currentJourney.image}
                  alt={currentJourney.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </motion.div>
            </AnimatePresence>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <p className="caption-uppercase text-white/60 mb-3">
                    {currentJourney.subtitle}
                  </p>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-white mb-4">
                    {currentJourney.title}
                  </h3>
                  <p className="text-white/80 max-w-xl mb-6 hidden md:block">
                    {currentJourney.description}
                  </p>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-3 text-white text-xs tracking-[0.15em] uppercase hover:text-[#C9A962] transition-colors duration-300"
                  >
                    Discover more
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-[#1A1A1A] transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-[#1A1A1A] transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-8">
            {journeys.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
