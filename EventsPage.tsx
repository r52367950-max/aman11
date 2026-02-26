import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, PartyPopper, Mic2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const eventTypes = [
  {
    title: 'Corporate Retreats',
    description: 'Inspire your team in extraordinary settings with tailored programs and world-class facilities.',
    icon: Briefcase,
  },
  {
    title: 'Board Meetings',
    description: 'Executive gatherings in private, sophisticated environments with full business support.',
    icon: Users,
  },
  {
    title: 'Celebrations',
    description: 'Milestone birthdays, anniversaries, and special occasions made unforgettable.',
    icon: PartyPopper,
  },
  {
    title: 'Conferences',
    description: 'Large-scale events with state-of-the-art technology and impeccable service.',
    icon: Mic2,
  },
];

export function EventsPage() {
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
          src="/images/hotels/aman-new-york.jpg"
          alt="Aman Events"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="caption-uppercase text-white/70 mb-4">Gatherings</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light">
              Events at Aman
            </h1>
            <p className="mt-6 text-white/80 max-w-xl mx-auto">
              Host extraordinary events in the world's most inspiring destinations
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div ref={sectionRef} className="container-aman py-20">
        <div className="max-w-4xl mx-auto text-center animate-in opacity-0">
          <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed mb-8">
            From intimate board meetings to grand celebrations, Aman provides the perfect 
            backdrop for events that inspire, connect, and create lasting impressions. 
            Our dedicated events team ensures every detail is executed flawlessly.
          </p>
          <p className="text-[#6B6B6B] leading-relaxed">
            With properties in the world's most extraordinary locations, Aman offers 
            unparalleled settings combined with exceptional service and world-class amenities.
          </p>
        </div>
      </div>

      {/* Event Types */}
      <div className="bg-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-[#9A9A9A] mb-4">What We Host</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A]">
              Event Types
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {eventTypes.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#F5F0E8] p-8 text-center"
              >
                <div className="w-16 h-16 bg-[#1A1A1A] flex items-center justify-center mx-auto mb-6">
                  <event.icon className="w-8 h-8 text-[#C9A962]" />
                </div>
                <h3 className="text-xl font-serif text-[#1A1A1A] mb-3">{event.title}</h3>
                <p className="text-[#6B6B6B] text-sm">{event.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-[#1A1A1A] text-white py-20">
        <div className="container-aman">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="caption-uppercase text-white/50 mb-4">Why Aman</p>
              <h2 className="text-3xl md:text-4xl font-serif font-light mb-6">
                The Aman Difference
              </h2>
              <ul className="space-y-4">
                {[
                  'Dedicated event planners for seamless execution',
                  'State-of-the-art technology and AV equipment',
                  'Customized catering by world-class chefs',
                  'Flexible indoor and outdoor venue options',
                  'Team-building activities and wellness programs',
                  'Exclusive buyout options for complete privacy',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-[#C9A962]" />
                    <span className="text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/hotels/aman-tokyo.jpg"
                alt="Event venue"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#F5F0E8] py-16">
        <div className="container-aman text-center">
          <h3 className="text-2xl md:text-3xl font-serif text-[#1A1A1A] mb-4">
            Plan Your Event
          </h3>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Contact our events team to discuss your requirements and begin planning
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors"
          >
            Inquire Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
