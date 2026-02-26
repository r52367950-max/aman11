import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Plane, Car, Compass, Ticket, Camera, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Travel Planning',
    description: 'Seamless travel arrangements including flights, transfers, and visas.',
    icon: Plane,
  },
  {
    title: 'Transportation',
    description: 'Private car services, helicopter transfers, and yacht charters.',
    icon: Car,
  },
  {
    title: 'Experiences',
    description: 'Curated local experiences and exclusive access to attractions.',
    icon: Compass,
  },
  {
    title: 'Entertainment',
    description: 'Theater tickets, event access, and private performances.',
    icon: Ticket,
  },
  {
    title: 'Photography',
    description: 'Professional photography services to capture your memories.',
    icon: Camera,
  },
  {
    title: 'Personal Services',
    description: 'Personal shopping, styling, and bespoke requests.',
    icon: Users,
  },
];

export function ConciergePage() {
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
          src="/images/experiences/city-escape.jpg"
          alt="Aman Concierge"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="caption-uppercase text-white/70 mb-4">At Your Service</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light">
              Concierge
            </h1>
            <p className="mt-6 text-white/80 max-w-xl mx-auto">
              Your personal gateway to extraordinary experiences
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div ref={sectionRef} className="container-aman py-20">
        <div className="max-w-4xl mx-auto text-center animate-in opacity-0">
          <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed mb-8">
            The Aman Concierge team is dedicated to making every aspect of your stay 
            seamless and memorable. From the moment you book until long after you depart, 
            we are here to anticipate your needs and exceed your expectations.
          </p>
          <p className="text-[#6B6B6B] leading-relaxed">
            Whether you seek adventure, relaxation, cultural immersion, or culinary 
            exploration, our concierge team has the knowledge and connections to create 
            experiences tailored just for you.
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-[#9A9A9A] mb-4">What We Offer</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A]">
              Concierge Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#F5F0E8] p-8"
              >
                <div className="w-14 h-14 bg-[#1A1A1A] flex items-center justify-center mb-6">
                  <service.icon className="w-7 h-7 text-[#C9A962]" />
                </div>
                <h3 className="text-xl font-serif font-light text-[#1A1A1A] mb-3">{service.title}</h3>
                <p className="text-[#6B6B6B] text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-[#1A1A1A] text-white py-20">
        <div className="container-aman text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-light mb-4">
            How May We Assist You?
          </h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Our concierge team is available 24/7 to fulfill your requests
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A962] text-white hover:bg-[#B8984D] transition-colors"
          >
            Contact Concierge
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
