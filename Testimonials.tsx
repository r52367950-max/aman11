import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  hotel: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alexandra Mitchell',
    location: 'London, UK',
    rating: 5,
    text: 'Aman New York exceeded every expectation. The attention to detail, the serenity in the heart of Manhattan, and the staff who anticipated our every need made this an unforgettable experience. The Jazz Club is a hidden gem.',
    hotel: 'Aman New York',
  },
  {
    id: '2',
    name: 'James Chen',
    location: 'Singapore',
    rating: 5,
    text: 'Staying at Aman Tokyo was like finding peace above the busiest city in the world. The infinity pool at sunrise with views of Mount Fuji is something I will cherish forever. True Japanese hospitality at its finest.',
    hotel: 'Aman Tokyo',
  },
  {
    id: '3',
    name: 'Isabella Romano',
    location: 'Milan, Italy',
    rating: 5,
    text: 'Amangiri is otherworldly. The architecture blends so perfectly with the landscape that you feel at one with nature. The slot canyon tour was life-changing. This is not just a hotel; it is a spiritual experience.',
    hotel: 'Amangiri',
  },
  {
    id: '4',
    name: 'William Thornton',
    location: 'Sydney, Australia',
    rating: 5,
    text: 'Amanpuri will always hold a special place in our hearts. We celebrated our anniversary there and the staff made us feel like royalty. The private beach, the Thai cuisine, the spa - everything was perfection.',
    hotel: 'Amanpuri',
  },
  {
    id: '5',
    name: 'Sophie Dubois',
    location: 'Paris, France',
    rating: 5,
    text: 'Aman Venice is like living in a museum, but with all the modern comforts. Waking up to views of the Grand Canal, dining in rooms with Tiepolo frescoes - it is the most romantic place I have ever stayed.',
    hotel: 'Aman Venice',
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.testimonial-element');

    const trigger = ScrollTrigger.create({
      trigger: section,
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

    return () => {
      trigger.kill();
    };
  }, []);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#1A1A1A] text-white">
      <div className="container-aman">
        {/* Section Header */}
        <div className="testimonial-element opacity-0 text-center mb-16">
          <p className="caption-uppercase text-white/50 mb-3">Guest Stories</p>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-white">
            What Our Guests Say
          </h2>
        </div>

        {/* Testimonial Slider */}
        <div className="testimonial-element opacity-0 relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <Quote className="absolute -top-8 left-0 w-16 h-16 text-[#C9A962]/20" />

          {/* Content */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="text-center px-4"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C9A962] text-[#C9A962]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-2xl lg:text-3xl font-serif font-light text-white leading-relaxed mb-8">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="space-y-1">
                  <p className="text-lg text-white font-medium">
                    {currentTestimonial.name}
                  </p>
                  <p className="text-sm text-white/50">
                    {currentTestimonial.location}
                  </p>
                  <p className="caption-uppercase text-[#C9A962] mt-2">
                    {currentTestimonial.hotel}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-[#1A1A1A] transition-all duration-300"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all duration-300',
                    index === currentIndex
                      ? 'bg-[#C9A962] w-6'
                      : 'bg-white/30 hover:bg-white/50'
                  )}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-[#1A1A1A] transition-all duration-300"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
