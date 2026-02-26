import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Droplets, Sun, Recycle, TreePine, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const initiatives = [
  {
    title: 'Environmental Stewardship',
    description: 'Protecting the natural environments where we operate through conservation programs and sustainable practices.',
    icon: TreePine,
  },
  {
    title: 'Water Conservation',
    description: 'Implementing water-saving technologies and wastewater treatment systems at all our properties.',
    icon: Droplets,
  },
  {
    title: 'Renewable Energy',
    description: 'Transitioning to renewable energy sources and reducing our carbon footprint.',
    icon: Sun,
  },
  {
    title: 'Waste Reduction',
    description: 'Minimizing waste through recycling programs, composting, and eliminating single-use plastics.',
    icon: Recycle,
  },
  {
    title: 'Local Sourcing',
    description: 'Supporting local communities by sourcing ingredients and materials from nearby suppliers.',
    icon: Leaf,
  },
  {
    title: 'Community Support',
    description: 'Investing in education, healthcare, and economic development in the communities where we operate.',
    icon: Heart,
  },
];

const achievements = [
  { value: '50%', label: 'Reduction in single-use plastics since 2020' },
  { value: '35%', label: 'Of energy from renewable sources' },
  { value: '100%', label: 'Properties with water treatment systems' },
  { value: '25+', label: 'Local community partnerships' },
];

export function SustainabilityPage() {
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
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src="/images/experiences/to-the-wilds.jpg"
          alt="Sustainability"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="caption-uppercase text-white/70 mb-4">Our Commitment</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light">
              Sustainability
            </h1>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div ref={sectionRef} className="container-aman py-20">
        <div className="max-w-4xl mx-auto text-center animate-in opacity-0">
          <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed mb-8">
            At Aman, we believe that true luxury must be sustainable. Our commitment to 
            preserving the natural beauty of our destinations is woven into everything we do.
          </p>
          <p className="text-[#6B6B6B] leading-relaxed">
            From the materials we use in construction to the ingredients we source for our 
            restaurants, every decision is made with consideration for its environmental impact. 
            We are dedicated to protecting the extraordinary places that make Aman unique.
          </p>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-serif font-light text-[#C9A962] mb-2">{achievement.value}</p>
              <p className="text-sm text-[#6B6B6B]">{achievement.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Initiatives */}
      <div className="bg-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-[#9A9A9A] mb-4">Our Approach</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A]">
              Key Initiatives
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={initiative.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#F5F0E8] p-8"
              >
                <div className="w-14 h-14 bg-[#1A1A1A] flex items-center justify-center mb-6">
                  <initiative.icon className="w-7 h-7 text-[#C9A962]" />
                </div>
                <h3 className="text-xl font-serif font-light text-[#1A1A1A] mb-3">{initiative.title}</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{initiative.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-aman text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-light mb-4">
            Join Us in Making a Difference
          </h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Learn more about our sustainability efforts and how you can contribute during your stay.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A962] text-white hover:bg-[#B8984D] transition-colors"
          >
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
