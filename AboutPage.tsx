import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, Award, Heart, Leaf, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '35+', label: 'Hotels & Resorts', icon: Globe },
  { value: '20', label: 'Countries', icon: MapIcon },
  { value: '1988', label: 'Founded', icon: Award },
  { value: '10,000+', label: 'Team Members', icon: Users },
];

const values = [
  {
    title: 'Peace',
    description: 'Creating sanctuaries of serenity in the world\'s most extraordinary locations.',
    icon: Heart,
  },
  {
    title: 'Harmony',
    description: 'Blending seamlessly with nature and local culture.',
    icon: Leaf,
  },
  {
    title: 'Excellence',
    description: 'Uncompromising standards in every detail.',
    icon: Sparkles,
  },
];

function MapIcon() {
  return <Globe className="w-6 h-6" />;
}

export function AboutPage() {
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
          src="/images/hotels/amanpuri.jpg"
          alt="Aman"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="caption-uppercase text-white/70 mb-4">About Aman</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light">
              The Aman Story
            </h1>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div ref={sectionRef} className="container-aman py-20">
        <div className="max-w-4xl mx-auto text-center animate-in opacity-0">
          <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed mb-8">
            Since 1988, Aman has been crafting sanctuaries of peace in the world's most 
            extraordinary locations. Our name means "peace" in Sanskrit, and this philosophy 
            guides everything we do.
          </p>
          <p className="text-[#6B6B6B] leading-relaxed">
            From a single beachfront resort in Phuket, Aman has grown into a global family of 
            35+ properties, each one a unique expression of its destination, designed to offer 
            guests a profound sense of place and the serenity to truly connect with it.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#1A1A1A] flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-[#C9A962]" />
              </div>
              <p className="text-4xl font-serif text-[#1A1A1A] mb-2">{stat.value}</p>
              <p className="text-sm text-[#6B6B6B]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Philosophy */}
      <div className="bg-[#1A1A1A] text-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-white/50 mb-4">Our Philosophy</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light">The Aman Way</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 border border-white/20 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-[#C9A962]" />
                </div>
                <h3 className="text-2xl font-serif mb-4">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="container-aman py-20">
        <div className="text-center mb-16">
          <p className="caption-uppercase text-[#9A9A9A] mb-4">Our Journey</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A]">
            Milestones
          </h2>
        </div>
        <div className="max-w-4xl mx-auto space-y-12">
          {[
            { year: '1988', title: 'The Beginning', description: 'Amanpuri opens in Phuket, Thailand - the first Aman resort.' },
            { year: '1992', title: 'Expanding Horizons', description: 'Amanpulo opens in the Philippines, followed by Amankila in Bali.' },
            { year: '1998', title: 'Going Global', description: 'Aman enters Africa with Amanjena in Morocco.' },
            { year: '2014', title: 'Urban Sanctuaries', description: 'Aman Tokyo opens, bringing the Aman philosophy to the city.' },
            { year: '2022', title: 'New York Debut', description: 'Aman New York opens in the historic Crown Building.' },
            { year: '2026', title: 'Aman at Sea', description: 'The launch of Amangati, Aman\'s first yacht.' },
          ].map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-8 items-start"
            >
              <div className="w-24 flex-shrink-0 text-right">
                <span className="text-2xl font-serif text-[#C9A962]">{milestone.year}</span>
              </div>
              <div className="w-px h-full bg-[#E5E0D8] relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#C9A962]" />
              </div>
              <div className="flex-1 pb-8">
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">{milestone.title}</h3>
                <p className="text-[#6B6B6B]">{milestone.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#F5F0E8] border-t border-[#E5E0D8] py-16">
        <div className="container-aman">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] mb-2">
                Discover the Aman Difference
              </h3>
              <p className="text-[#6B6B6B]">Explore our collection of extraordinary destinations.</p>
            </div>
            <div className="flex gap-4">
              <Link
                to="/hotels"
                className="px-8 py-4 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors flex items-center gap-2"
              >
                Explore Hotels
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about/our-story"
                className="px-8 py-4 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
