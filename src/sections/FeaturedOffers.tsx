import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

interface Offer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  discount: string;
  validUntil: string;
  href: string;
  featured: boolean;
}

const offers: Offer[] = [
  {
    id: '1',
    title: 'Winter Escape',
    subtitle: 'Alpine Awakening',
    description: 'Experience the magic of the Alps with up to 25% off your stay at Aman Le Mélézin.',
    image: '/images/experiences/alpine-awakening.jpg',
    discount: '25% OFF',
    validUntil: 'March 31, 2025',
    href: '/hotels/aman-le-melezin',
    featured: true,
  },
  {
    id: '2',
    title: 'Tropical Paradise',
    subtitle: 'Amanpuri Special',
    description: 'Stay 4 nights and pay for 3 at our flagship Thai resort.',
    image: '/images/hotels/amanpuri.jpg',
    discount: 'Stay 4, Pay 3',
    validUntil: 'April 30, 2025',
    href: '/hotels/amanpuri',
    featured: false,
  },
  {
    id: '3',
    title: 'Desert Dreams',
    subtitle: 'Amangiri Experience',
    description: 'Complimentary helicopter transfer with any 3-night stay.',
    image: '/images/hotels/amangiri.jpg',
    discount: 'Free Transfer',
    validUntil: 'May 15, 2025',
    href: '/hotels/amangiri',
    featured: false,
  },
];

export function FeaturedOffers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeOffer, setActiveOffer] = useState<string>(offers[0].id);
  const handleOfferHover = useCallback((id: string) => setActiveOffer(id), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.offer-element');

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

  const featuredOffer = offers.find((o) => o.featured);
  const otherOffers = offers.filter((o) => !o.featured);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-white">
      <div className="container-aman">
        {/* Section Header */}
        <div className="offer-element opacity-0 flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="caption-uppercase text-[#9A9A9A] mb-3">Limited Time</p>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#1A1A1A]">
              Featured Offers
            </h2>
          </div>
          <Link
            to="/offers"
            className="group mt-4 md:mt-0 inline-flex items-center gap-2 text-[#1A1A1A] hover:text-[#C9A962] transition-colors"
          >
            <span className="text-sm tracking-[0.1em] uppercase">View All Offers</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Featured Offer */}
          {featuredOffer && (
            <Link
              to={featuredOffer.href}
              className="offer-element opacity-0 group relative aspect-[4/3] lg:aspect-auto overflow-hidden"
            >
              <img
                src={featuredOffer.image}
                alt={featuredOffer.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              {/* Badge */}
              <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 bg-[#C9A962]">
                <Tag className="w-3 h-3 text-white" />
                <span className="text-xs font-medium text-white tracking-wider">
                  {featuredOffer.discount}
                </span>
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="caption-uppercase text-white/70 mb-2">
                  {featuredOffer.subtitle}
                </p>
                <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-3">
                  {featuredOffer.title}
                </h3>
                <p className="text-white/80 mb-4 max-w-md">
                  {featuredOffer.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-white/60 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Valid until {featuredOffer.validUntil}</span>
                  </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-white text-sm tracking-[0.1em] uppercase group-hover:text-[#C9A962] transition-colors">
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          )}

          {/* Other Offers */}
          <div className="flex flex-col gap-6">
            {otherOffers.map((offer) => (
              <Link
                key={offer.id}
                to={offer.href}
                className={`offer-element opacity-0 group flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 border transition-all duration-300 ${activeOffer === offer.id ? 'bg-white border-[#E5E0D8]' : 'bg-[#F5F0E8] border-transparent'}`}
                onMouseEnter={() => handleOfferHover(offer.id)}
              >
                {/* Image */}
                <div className="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0 overflow-hidden">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 left-2 px-2 py-1 bg-[#C9A962]">
                    <span className="text-[10px] font-medium text-white tracking-wider">
                      {offer.discount}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center">
                  <p className="caption-uppercase text-[#9A9A9A] mb-1">
                    {offer.subtitle}
                  </p>
                  <h4 className="text-xl font-serif font-light text-[#1A1A1A] group-hover:text-[#C9A962] transition-colors mb-2">
                    {offer.title}
                  </h4>
                  <p className="text-sm text-[#6B6B6B] mb-3 line-clamp-2">
                    {offer.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-[#9A9A9A] text-xs">
                    <Clock className="w-3 h-3" />
                    <span>Until {offer.validUntil}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
