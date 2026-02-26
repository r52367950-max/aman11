import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Flower2, Camera, Music, Utensils } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const venues = [
  {
    name: 'Beachfront',
    description: 'Exchange vows on pristine sands with the ocean as your backdrop.',
    image: '/images/experiences/winter-sun.jpg',
  },
  {
    name: 'Garden',
    description: 'Celebrate amidst lush tropical gardens and blooming flowers.',
    image: '/images/hotels/amanpuri.jpg',
  },
  {
    name: 'Historic',
    description: 'Say "I do" in centuries-old palaces and grand ballrooms.',
    image: '/images/hotels/aman-venice.jpg',
  },
  {
    name: 'Mountain',
    description: 'Wed against the backdrop of majestic peaks and alpine vistas.',
    image: '/images/experiences/alpine-awakening.jpg',
  },
];

const services = [
  { title: 'Wedding Planning', description: 'Dedicated planners to handle every detail', icon: Heart },
  { title: 'Floral Design', description: 'Bespoke arrangements and decor', icon: Flower2 },
  { title: 'Photography', description: 'Professional capture of your special day', icon: Camera },
  { title: 'Entertainment', description: 'Live music and DJ services', icon: Music },
  { title: 'Catering', description: 'Customized menus for your celebration', icon: Utensils },
];

export function WeddingsPage() {
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
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src="/images/hotels/aman-venice.jpg"
          alt="Aman Weddings"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="caption-uppercase text-white/70 mb-4">Celebrate Love</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light">
              Weddings at Aman
            </h1>
            <p className="mt-6 text-white/80 max-w-xl mx-auto">
              Create unforgettable memories in the world's most extraordinary destinations
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div ref={sectionRef} className="container-aman py-20">
        <div className="max-w-4xl mx-auto text-center animate-in opacity-0">
          <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed mb-8">
            Your wedding day deserves a setting as extraordinary as your love story. 
            At Aman, we create bespoke celebrations that reflect your unique vision, 
            in destinations that will take your breath away.
          </p>
          <p className="text-[#6B6B6B] leading-relaxed">
            From intimate ceremonies to grand celebrations, our dedicated wedding team 
            will guide you through every step, ensuring your special day is nothing short 
            of perfection.
          </p>
        </div>
      </div>

      {/* Venues */}
      <div className="bg-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-[#9A9A9A] mb-4">Choose Your Setting</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A]">
              Wedding Venues
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {venues.map((venue, index) => (
              <motion.div
                key={venue.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative aspect-[4/3] overflow-hidden group"
              >
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-serif font-light text-white mb-2">{venue.name}</h3>
                  <p className="text-white/80 text-sm">{venue.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-[#1A1A1A] text-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-white/50 mb-4">What We Offer</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light">
              Wedding Services
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 border border-white/20 flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-7 h-7 text-[#C9A962]" />
                </div>
                <h3 className="text-lg font-serif font-light mb-2">{service.title}</h3>
                <p className="text-white/70 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#F5F0E8] py-16">
        <div className="container-aman text-center">
          <Heart className="w-12 h-12 text-[#C9A962] mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-serif font-light text-[#1A1A1A] mb-4">
            Begin Planning Your Dream Wedding
          </h3>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Contact our wedding specialists to start creating your perfect day
          </p>
          <Link to="/contact" className="btn-primary gap-2">
            Inquire Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
