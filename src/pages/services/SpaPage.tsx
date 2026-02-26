import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Wind, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const treatments = [
  {
    category: 'Massage',
    items: [
      { name: 'Aman Signature Massage', duration: '90 min', price: '$350' },
      { name: 'Deep Tissue Therapy', duration: '60 min', price: '$280' },
      { name: 'Hot Stone Massage', duration: '90 min', price: '$320' },
    ],
  },
  {
    category: 'Facial',
    items: [
      { name: 'Radiance Facial', duration: '75 min', price: '$280' },
      { name: 'Anti-Aging Treatment', duration: '90 min', price: '$380' },
      { name: 'Hydrating Facial', duration: '60 min', price: '$220' },
    ],
  },
  {
    category: 'Body',
    items: [
      { name: 'Body Scrub & Wrap', duration: '90 min', price: '$290' },
      { name: 'Detoxifying Treatment', duration: '120 min', price: '$420' },
      { name: 'Aromatherapy Ritual', duration: '75 min', price: '$250' },
    ],
  },
];

const wellnessPrograms = [
  {
    title: 'Detox & Cleanse',
    description: 'A comprehensive program designed to eliminate toxins and restore balance.',
    duration: '3-7 days',
    icon: Leaf,
  },
  {
    title: 'Stress Relief',
    description: 'Targeted treatments to reduce stress and promote deep relaxation.',
    duration: '2-5 days',
    icon: Wind,
  },
  {
    title: 'Rejuvenation',
    description: 'Revitalize your body and mind with our signature rejuvenation program.',
    duration: '5-10 days',
    icon: Sparkles,
  },
];

export function SpaPage() {
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
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src="/images/misc/aman-essentials.jpg"
          alt="Aman Spa"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="caption-uppercase text-white/70 mb-4">Sanctuaries of Wellness</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light">
              Aman Spa
            </h1>
            <p className="mt-6 text-white/80 max-w-xl mx-auto">
              Discover tranquility and rejuvenation at our world-class spa facilities
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div ref={sectionRef} className="container-aman py-20">
        <div className="max-w-4xl mx-auto text-center animate-in opacity-0">
          <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed">
            The Aman Spa philosophy is rooted in ancient healing traditions from around the world, 
            combined with modern wellness practices. Each treatment is designed to restore balance, 
            promote relaxation, and enhance your overall wellbeing.
          </p>
        </div>
      </div>

      {/* Treatments */}
      <div className="bg-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-[#9A9A9A] mb-4">Our Offerings</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A]">
              Signature Treatments
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {treatments.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-2xl font-serif font-light text-[#1A1A1A] mb-6 pb-4 border-b border-[#E5E0D8]">
                  {category.category}
                </h3>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between py-3 border-b border-[#E5E0D8]"
                    >
                      <div>
                        <p className="text-[#1A1A1A]">{item.name}</p>
                        <p className="text-sm text-[#9A9A9A]">{item.duration}</p>
                      </div>
                      <p className="text-[#C9A962] font-medium">{item.price}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Wellness Programs */}
      <div className="bg-[#1A1A1A] text-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-white/50 mb-4">Immersive Experiences</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light">
              Wellness Programs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {wellnessPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-white/20 p-8 text-center hover:border-[#C9A962] transition-colors"
              >
                <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-6">
                  <program.icon className="w-8 h-8 text-[#C9A962]" />
                </div>
                <h3 className="text-xl font-serif font-light mb-3">{program.title}</h3>
                <p className="text-white/70 text-sm mb-4">{program.description}</p>
                <p className="text-[#C9A962] text-sm">{program.duration}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#F5F0E8] py-16">
        <div className="container-aman text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-light text-[#1A1A1A] mb-4">
            Book Your Spa Experience
          </h3>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Contact our spa team to customize your wellness journey
          </p>
          <Link to="/contact" className="btn-primary gap-2">
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
