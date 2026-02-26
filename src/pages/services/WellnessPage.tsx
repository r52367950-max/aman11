import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Brain, Sun, Activity } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    title: 'Physical',
    description: 'Fitness programs, movement classes, and body treatments designed to strengthen and energize.',
    icon: Activity,
  },
  {
    title: 'Mental',
    description: 'Meditation, mindfulness practices, and therapies to calm the mind and reduce stress.',
    icon: Brain,
  },
  {
    title: 'Emotional',
    description: 'Holistic therapies and counseling to support emotional balance and wellbeing.',
    icon: Heart,
  },
  {
    title: 'Spiritual',
    description: 'Ancient practices and ceremonies to connect with your inner self and find meaning.',
    icon: Sun,
  },
];

const programs = [
  {
    title: 'Immersion',
    duration: '3-14 days',
    description: 'Comprehensive wellness programs tailored to your individual goals and needs.',
  },
  {
    title: 'Retreat',
    duration: '7-21 days',
    description: 'Deep-dive wellness experiences with expert practitioners and personalized care.',
  },
  {
    title: 'Journey',
    duration: '21+ days',
    description: 'Transformative long-term programs for lasting lifestyle changes.',
  },
];

export function WellnessPage() {
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
          src="/images/experiences/winter-sun.jpg"
          alt="Aman Wellness"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="caption-uppercase text-white/70 mb-4">Holistic Approach</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light">
              Aman Wellness
            </h1>
            <p className="mt-6 text-white/80 max-w-xl mx-auto">
              A comprehensive approach to wellbeing that nurtures body, mind, and spirit
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div ref={sectionRef} className="container-aman py-20">
        <div className="max-w-4xl mx-auto text-center animate-in opacity-0">
          <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed mb-8">
            Aman Wellness is built on the understanding that true health encompasses more 
            than just the physical body. Our holistic approach addresses the interconnected 
            nature of physical, mental, emotional, and spiritual wellbeing.
          </p>
          <p className="text-[#6B6B6B] leading-relaxed">
            Drawing from ancient healing traditions and modern science, we create personalized 
            programs that help you achieve balance, vitality, and inner peace.
          </p>
        </div>
      </div>

      {/* Four Pillars */}
      <div className="bg-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-[#9A9A9A] mb-4">The Foundation</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A]">
              Four Pillars of Wellness
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 border border-[#E5E0D8] flex items-center justify-center mx-auto mb-6">
                  <pillar.icon className="w-8 h-8 text-[#C9A962]" />
                </div>
                <h3 className="text-xl font-serif font-light text-[#1A1A1A] mb-3">{pillar.title}</h3>
                <p className="text-[#6B6B6B] text-sm">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Programs */}
      <div className="bg-[#1A1A1A] text-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-white/50 mb-4">Your Journey</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light">
              Wellness Programs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-white/20 p-8 text-center hover:border-[#C9A962] transition-colors"
              >
                <h3 className="text-2xl font-serif font-light mb-2">{program.title}</h3>
                <p className="text-[#C9A962] text-sm mb-4">{program.duration}</p>
                <p className="text-white/70 text-sm">{program.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#F5F0E8] py-16">
        <div className="container-aman text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-light text-[#1A1A1A] mb-4">
            Begin Your Wellness Journey
          </h3>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Contact our wellness team to design a program tailored to your needs
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
