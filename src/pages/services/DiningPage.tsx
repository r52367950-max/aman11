import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const restaurants = [
  {
    name: 'Arva',
    cuisine: 'Italian',
    description: 'Aman\'s Italian restaurant concept celebrates the simplicity and elegance of Italian cooking, using the freshest seasonal ingredients.',
    image: '/images/experiences/alpine-awakening.jpg',
    locations: ['Aman New York', 'Aman Tokyo', 'Amanpuri', 'Aman Venice'],
  },
  {
    name: 'Nama',
    cuisine: 'Japanese',
    description: 'Traditional Japanese washoku dining with a contemporary twist, honoring the principles of balance and seasonality.',
    image: '/images/hotels/aman-tokyo.jpg',
    locations: ['Aman New York', 'Aman Tokyo', 'Amanpuri'],
  },
  {
    name: 'The Restaurant',
    cuisine: 'International',
    description: 'Each Aman property features its signature restaurant, offering cuisine that reflects the local culture and ingredients.',
    image: '/images/hotels/aman-new-york.jpg',
    locations: ['All Aman Properties'],
  },
];

const experiences = [
  {
    title: 'Private Dining',
    description: 'Intimate dining experiences in exclusive settings, from beachfront pavilions to mountain viewpoints.',
  },
  {
    title: 'Chef\'s Table',
    description: 'An exclusive culinary journey with our executive chefs, featuring bespoke menus and wine pairings.',
  },
  {
    title: 'Cooking Classes',
    description: 'Learn the secrets of local cuisine with hands-on cooking classes led by our expert chefs.',
  },
  {
    title: 'Wine Tastings',
    description: 'Curated wine experiences featuring selections from our extensive cellars and local vineyards.',
  },
];

export function DiningPage() {
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
          src="/images/experiences/alpine-awakening.jpg"
          alt="Aman Dining"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="caption-uppercase text-white/70 mb-4">Culinary Excellence</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light">
              Aman Dining
            </h1>
            <p className="mt-6 text-white/80 max-w-xl mx-auto">
              Savor exceptional cuisine crafted with the finest ingredients
            </p>
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div ref={sectionRef} className="container-aman py-20">
        <div className="max-w-4xl mx-auto text-center animate-in opacity-0">
          <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed">
            At Aman, dining is an integral part of the experience. Our restaurants celebrate 
            local flavors and seasonal ingredients, creating menus that honor the culinary 
            traditions of each destination while embracing innovation and creativity.
          </p>
        </div>
      </div>

      {/* Restaurants */}
      <div className="bg-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-[#9A9A9A] mb-4">Our Restaurants</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A]">
              Signature Concepts
            </h2>
          </div>

          <div className="space-y-16">
            {restaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
                <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                  <p className="caption-uppercase text-[#C9A962] mb-3">{restaurant.cuisine}</p>
                  <h3 className="text-3xl font-serif font-light text-[#1A1A1A] mb-4">{restaurant.name}</h3>
                  <p className="text-[#6B6B6B] mb-6">{restaurant.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {restaurant.locations.map((location) => (
                      <span
                        key={location}
                        className="px-3 py-1 bg-[#F5F0E8] text-xs text-[#6B6B6B]"
                      >
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Experiences */}
      <div className="bg-[#1A1A1A] text-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-white/50 mb-4">Beyond the Table</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light">
              Dining Experiences
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-white/20 p-8 hover:border-[#C9A962] transition-colors"
              >
                <h3 className="text-xl font-serif font-light mb-3">{experience.title}</h3>
                <p className="text-white/70 text-sm">{experience.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#F5F0E8] py-16">
        <div className="container-aman text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-light text-[#1A1A1A] mb-4">
            Reserve Your Table
          </h3>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Contact us to book your dining experience at any Aman property
          </p>
          <Link to="/contact" className="btn-primary gap-2">
            Make a Reservation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
