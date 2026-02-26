import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Gift, Calendar, User, Plane, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: 'Silver',
    price: 'Free',
    description: 'Join at no cost and start earning rewards',
    benefits: [
      'Member rates on accommodations',
      'Priority room upgrades',
      'Late checkout (subject to availability)',
      'Welcome amenity',
      'Earn points on stays and dining',
    ],
    color: 'bg-gray-400',
  },
  {
    name: 'Gold',
    price: '$500/year',
    description: 'Enhanced benefits for frequent travelers',
    benefits: [
      'All Silver benefits',
      'Complimentary breakfast',
      'Spa credits',
      'Airport transfers',
      'Dedicated reservations line',
      '20% bonus points',
    ],
    color: 'bg-[#C9A962]',
    featured: true,
  },
  {
    name: 'Platinum',
    price: '$2,000/year',
    description: 'The ultimate Aman experience',
    benefits: [
      'All Gold benefits',
      'Complimentary suite upgrades',
      'Private dining experiences',
      'Wellness consultations',
      'Exclusive events access',
      '50% bonus points',
      'Personal concierge',
    ],
    color: 'bg-[#1A1A1A]',
  },
];

const benefits = [
  {
    icon: Star,
    title: 'Earn Points',
    description: 'Earn points on every stay, spa treatment, and dining experience',
  },
  {
    icon: Gift,
    title: 'Redeem Rewards',
    description: 'Use points for free nights, upgrades, and exclusive experiences',
  },
  {
    icon: Calendar,
    title: 'Priority Access',
    description: 'Early access to new properties and special offers',
  },
  {
    icon: User,
    title: 'Personalized Service',
    description: 'Your preferences remembered at every property',
  },
  {
    icon: Plane,
    title: 'Travel Perks',
    description: 'Airport transfers, late checkout, and room upgrades',
  },
];

export function MembershipPage() {
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
          alt="Aman Membership"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="caption-uppercase text-white/70 mb-4">Loyalty Program</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light">
              Aman Membership
            </h1>
            <p className="mt-6 text-white/80 max-w-xl mx-auto">
              Unlock exclusive benefits and rewards across all Aman properties
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div ref={sectionRef} className="container-aman py-20">
        <div className="max-w-4xl mx-auto text-center animate-in opacity-0">
          <p className="text-xl md:text-2xl text-[#6B6B6B] leading-relaxed">
            The Aman Membership program is our way of saying thank you. Earn points on every stay, 
            enjoy exclusive benefits, and experience Aman like never before.
          </p>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-[#9A9A9A] mb-4">Member Benefits</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A]">
              Why Join?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#1A1A1A] flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-[#C9A962]" />
                </div>
                <h3 className="text-lg font-serif font-light text-[#1A1A1A] mb-2">{benefit.title}</h3>
                <p className="text-[#6B6B6B] text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tiers */}
      <div className="bg-[#1A1A1A] text-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-white/50 mb-4">Membership Levels</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light">
              Choose Your Tier
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`border ${tier.featured ? 'border-[#C9A962]' : 'border-white/20'} p-8 relative`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C9A962] text-xs tracking-wider">
                    MOST POPULAR
                  </div>
                )}
                <div className={`w-16 h-16 ${tier.color} flex items-center justify-center mx-auto mb-6`}>
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-serif font-light text-center mb-2">{tier.name}</h3>
                <p className="text-3xl text-center text-[#C9A962] font-medium mb-2">{tier.price}</p>
                <p className="text-white/70 text-center text-sm mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-[#C9A962] mt-0.5 flex-shrink-0" />
                      <span className="text-white/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`w-full py-3 text-center block transition-colors ${
                    tier.featured
                      ? 'bg-[#C9A962] text-white hover:bg-[#B8984D]'
                      : 'border border-white/30 text-white hover:bg-white hover:text-[#1A1A1A]'
                  }`}
                >
                  Join Now
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#F5F0E8] py-16">
        <div className="container-aman text-center">
          <h3 className="text-2xl md:text-3xl font-serif font-light text-[#1A1A1A] mb-4">
            Ready to Join?
          </h3>
          <p className="text-[#6B6B6B] mb-8 max-w-xl mx-auto">
            Start your journey with Aman Membership today and unlock a world of exclusive benefits.
          </p>
          <Link to="/contact" className="btn-primary gap-2">
            Become a Member
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
