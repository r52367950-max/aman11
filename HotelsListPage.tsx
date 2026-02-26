import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MapPin, Filter, Grid3X3, LayoutList, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getAllHotels } from '@/data/hotels';
import type { HotelDetail } from '@/data/hotels';

gsap.registerPlugin(ScrollTrigger);

const regions = ['All', 'Americas', 'Europe', 'Asia', 'Middle East & Africa'];

export function HotelsListPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const hotels = getAllHotels();

  const filteredHotels = hotels.filter((hotel) => {
    const matchesRegion =
      selectedRegion === 'All' ||
      (selectedRegion === 'Americas' &&
        (hotel.country === 'United States' ||
          hotel.country === 'Dominican Republic' ||
          hotel.country === 'Turks & Caicos Islands')) ||
      (selectedRegion === 'Europe' &&
        (hotel.country === 'Italy' ||
          hotel.country === 'Greece' ||
          hotel.country === 'France' ||
          hotel.country === 'Montenegro' ||
          hotel.country === 'United Kingdom')) ||
      (selectedRegion === 'Asia' &&
        (hotel.country === 'Japan' ||
          hotel.country === 'Thailand' ||
          hotel.country === 'Indonesia' ||
          hotel.country === 'India' ||
          hotel.country === 'Bhutan' ||
          hotel.country === 'Vietnam' ||
          hotel.country === 'Philippines' ||
          hotel.country === 'Sri Lanka' ||
          hotel.country === 'Laos' ||
          hotel.country === 'Cambodia' ||
          hotel.country === 'China' ||
          hotel.country === 'Maldives' ||
          hotel.country === 'Singapore')) ||
      (selectedRegion === 'Middle East & Africa' &&
        (hotel.country === 'Morocco' ||
          hotel.country === 'Turkey' ||
          hotel.country === 'United Arab Emirates' ||
          hotel.country === 'Kingdom of Saudi Arabia' ||
          hotel.country === 'Mozambique'));

    const matchesSearch =
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hotel.country.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRegion && matchesSearch;
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.hotel-card');

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
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
  }, [filteredHotels]);

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Hero Header */}
      <div className="bg-[#1A1A1A] text-white py-16 md:py-24">
        <div className="container-aman">
          <p className="caption-uppercase text-white/50 mb-4">Our Collection</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-6">
            Hotels & Resorts
          </h1>
          <p className="text-white/70 max-w-2xl text-lg">
            Discover 35 extraordinary destinations across 20 countries, each offering
            a unique interpretation of the Aman philosophy.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-20 z-40 bg-[#F5F0E8] border-b border-[#E5E0D8]">
        <div className="container-aman py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#E5E0D8] text-sm focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            {/* Region Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-4 h-4 text-[#9A9A9A] flex-shrink-0" />
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={cn(
                    'px-4 py-2 text-sm whitespace-nowrap transition-all',
                    selectedRegion === region
                      ? 'bg-[#1A1A1A] text-white'
                      : 'bg-white text-[#6B6B6B] hover:text-[#1A1A1A]'
                  )}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-1 border border-[#E5E0D8] bg-white">
              <button
                onClick={() => setViewMode('grid')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'grid' ? 'bg-[#1A1A1A] text-white' : 'text-[#6B6B6B]'
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  'p-2 transition-colors',
                  viewMode === 'list' ? 'bg-[#1A1A1A] text-white' : 'text-[#6B6B6B]'
                )}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Grid/List */}
      <div ref={sectionRef} className="container-aman py-12">
        <div
          className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'flex flex-col gap-6'
          )}
        >
          {filteredHotels.map((hotel, index) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              index={index}
              viewMode={viewMode}
            />
          ))}
        </div>

        {filteredHotels.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#6B6B6B]">No hotels found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface HotelCardProps {
  hotel: HotelDetail;
  index: number;
  viewMode: 'grid' | 'list';
}

function HotelCard({ hotel, viewMode }: HotelCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (viewMode === 'list') {
    return (
      <Link
        to={`/hotels/${hotel.slug}`}
        className="hotel-card opacity-0 group flex flex-col md:flex-row gap-6 p-4 bg-white border border-[#E5E0D8] hover:border-[#C9A962] transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative w-full md:w-80 h-64 md:h-48 flex-shrink-0 overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className={cn(
              'w-full h-full object-cover transition-transform duration-700',
              isHovered ? 'scale-105' : 'scale-100'
            )}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center flex-1">
          <div className="flex items-center gap-2 text-[#9A9A9A] text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>
              {hotel.location}, {hotel.country}
            </span>
          </div>
          <h3 className="text-2xl font-serif text-[#1A1A1A] group-hover:text-[#C9A962] transition-colors mb-3">
            {hotel.name}
          </h3>
          <p className="text-[#6B6B6B] line-clamp-2 mb-4">{hotel.description}</p>
          <div className="flex items-center gap-2 text-sm text-[#C9A962]">
            <span>Explore</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/hotels/${hotel.slug}`}
      className="hotel-card opacity-0 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white border border-[#E5E0D8] overflow-hidden hover:border-[#C9A962] transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={hotel.image}
            alt={hotel.name}
            className={cn(
              'w-full h-full object-cover transition-transform duration-700',
              isHovered ? 'scale-105' : 'scale-100'
            )}
          />
          <div
            className={cn(
              'absolute inset-0 bg-black/20 transition-opacity duration-500',
              isHovered ? 'opacity-100' : 'opacity-0'
            )}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 text-[#9A9A9A] text-sm mb-2">
            <MapPin className="w-4 h-4" />
            <span>
              {hotel.location}, {hotel.country}
            </span>
          </div>
          <h3 className="text-xl font-serif text-[#1A1A1A] group-hover:text-[#C9A962] transition-colors mb-2">
            {hotel.name}
          </h3>
          <p className="text-sm text-[#6B6B6B] line-clamp-2">{hotel.description}</p>
        </div>

        {/* Hover Border */}
        <div
          className={cn(
            'absolute bottom-0 left-0 h-1 bg-[#C9A962] transition-all duration-300',
            isHovered ? 'w-full' : 'w-0'
          )}
        />
      </motion.div>
    </Link>
  );
}
