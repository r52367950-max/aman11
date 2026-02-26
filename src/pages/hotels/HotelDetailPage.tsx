import { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Waves,
  Utensils,
  Dumbbell,
  Wine,
  Coffee,
  Wind,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  ArrowRight,
  Check,
  Heart,
  Share2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getHotelBySlug } from '@/data/hotels';

gsap.registerPlugin(ScrollTrigger);

const amenityIcons: Record<string, React.ElementType> = {
  'Wi-Fi': Wifi,
  'Parking': Car,
  'Pool': Waves,
  'Restaurant': Utensils,
  'Gym': Dumbbell,
  'Bar': Wine,
  'Room Service': Coffee,
  'Spa': Wind,
};

export function HotelDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const hotel = getHotelBySlug(slug || '');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'rooms' | 'dining' | 'spa' | 'experiences'>('overview');

  useEffect(() => {
    if (!hotel) return;

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

    return () => {
      trigger.kill();
    };
  }, [hotel]);

  if (!hotel) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] pt-32 text-center">
        <h1 className="text-3xl font-serif font-light text-[#1A1A1A]">Hotel not found</h1>
        <Link to="/hotels" className="text-[#C9A962] mt-4 inline-block">
          Back to Hotels
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.gallery.length) % hotel.gallery.length);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Hero Gallery */}
      <div className="relative h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={hotel.gallery[currentImageIndex]}
            alt={hotel.name}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-[#1A1A1A] transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-[#1A1A1A] transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-24 right-4 bg-black/50 px-3 py-1 text-white text-sm">
          {currentImageIndex + 1} / {hotel.gallery.length}
        </div>

        {/* Back Button */}
        <Link
          to="/hotels"
          className="absolute top-24 left-4 flex items-center gap-2 text-white hover:text-[#C9A962] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back to Hotels</span>
        </Link>

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container-aman">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-white/70 mb-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {hotel.location}, {hotel.country}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">
                  {hotel.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A962] text-[#C9A962]" />
                    ))}
                  </div>
                  <span className="text-white/70 text-sm">
                    {hotel.reviews.length} reviews
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={cn(
                    'w-12 h-12 flex items-center justify-center border border-white/30 transition-all',
                    isLiked
                      ? 'bg-red-500 border-red-500 text-white'
                      : 'bg-white/10 text-white hover:bg-white hover:text-[#1A1A1A]'
                  )}
                >
                  <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
                </button>
                <button className="w-12 h-12 flex items-center justify-center bg-white/10 border border-white/30 text-white hover:bg-white hover:text-[#1A1A1A] transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-20 z-40 bg-white border-b border-[#E5E0D8]">
        <div className="container-aman">
          <div className="flex overflow-x-auto">
            {(['overview', 'rooms', 'dining', 'spa', 'experiences'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  'px-6 py-4 text-sm tracking-[0.1em] uppercase whitespace-nowrap transition-all border-b-2',
                  activeTab === tab
                    ? 'border-[#C9A962] text-[#1A1A1A]'
                    : 'border-transparent text-[#6B6B6B] hover:text-[#1A1A1A]'
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={sectionRef} className="container-aman py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section className="animate-in opacity-0">
                <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">About</h2>
                <p className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                  {hotel.longDescription}
                </p>
              </section>

              {/* Amenities */}
              <section className="animate-in opacity-0">
                <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity.split(' ')[0]] || Check;
                    return (
                      <div key={amenity} className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F5F0E8] flex items-center justify-center">
                          <Icon className="w-5 h-5 text-[#C9A962]" />
                        </div>
                        <span className="text-sm text-[#6B6B6B]">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Location */}
              <section className="animate-in opacity-0">
                <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Location</h2>
                <div className="bg-[#F5F0E8] p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C9A962] mt-0.5" />
                    <div>
                      <p className="text-[#1A1A1A]">{hotel.locationDetails.address}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#9A9A9A]">Nearest Airport</p>
                      <p className="text-[#1A1A1A]">{hotel.locationDetails.airport}</p>
                    </div>
                    <div>
                      <p className="text-[#9A9A9A]">Transfer Time</p>
                      <p className="text-[#1A1A1A]">{hotel.locationDetails.transferTime}</p>
                    </div>
                    <div>
                      <p className="text-[#9A9A9A]">Best Time to Visit</p>
                      <p className="text-[#1A1A1A]">{hotel.locationDetails.bestTimeToVisit}</p>
                    </div>
                    <div>
                      <p className="text-[#9A9A9A]">Climate</p>
                      <p className="text-[#1A1A1A]">{hotel.locationDetails.climate}</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Reviews */}
              <section className="animate-in opacity-0">
                <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Guest Reviews</h2>
                <div className="space-y-6">
                  {hotel.reviews.map((review) => (
                    <div key={review.id} className="bg-white border border-[#E5E0D8] p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-[#F5F0E8] flex items-center justify-center text-[#C9A962] font-serif font-light">
                            {review.author[0]}
                          </div>
                          <div>
                            <p className="text-[#1A1A1A] font-medium">{review.author}</p>
                            <p className="text-xs text-[#9A9A9A]">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#C9A962] text-[#C9A962]" />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#6B6B6B]">{review.comment}</p>
                      {review.verified && (
                        <div className="flex items-center gap-1 mt-3 text-xs text-green-600">
                          <Check className="w-3 h-3" />
                          <span>Verified stay</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-40 bg-white border border-[#E5E0D8] p-6">
                <h3 className="text-xl font-serif font-light text-[#1A1A1A] mb-4">Book Your Stay</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-1 block">Check-in</label>
                    <div className="flex items-center gap-2 p-3 bg-[#F5F0E8]">
                      <Calendar className="w-4 h-4 text-[#9A9A9A]" />
                      <input
                        type="date"
                        className="bg-transparent flex-1 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-1 block">Check-out</label>
                    <div className="flex items-center gap-2 p-3 bg-[#F5F0E8]">
                      <Calendar className="w-4 h-4 text-[#9A9A9A]" />
                      <input
                        type="date"
                        className="bg-transparent flex-1 text-sm focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-1 block">Guests</label>
                    <div className="flex items-center gap-2 p-3 bg-[#F5F0E8]">
                      <Users className="w-4 h-4 text-[#9A9A9A]" />
                      <select className="bg-transparent flex-1 text-sm focus:outline-none">
                        <option>1 Guest</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4 Guests</option>
                      </select>
                    </div>
                  </div>
                  <Link
                    to={`/book?hotel=${hotel.slug}`}
                    className="w-full py-4 bg-[#1A1A1A] text-white text-center text-sm tracking-[0.1em] uppercase hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Check Availability</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rooms Tab */}
        {activeTab === 'rooms' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotel.rooms.map((room) => (
              <div key={room.id} className="animate-in opacity-0 bg-white border border-[#E5E0D8] overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-light text-[#1A1A1A] mb-2">{room.name}</h3>
                  <p className="text-sm text-[#6B6B6B] mb-3">{room.description}</p>
                  <p className="text-sm text-[#9A9A9A] mb-4">{room.size}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {room.features.map((feature) => (
                      <span key={feature} className="px-2 py-1 bg-[#F5F0E8] text-xs text-[#6B6B6B]">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg text-[#C9A962] font-medium">{room.price}<span className="text-sm text-[#9A9A9A]">/night</span></p>
                    <Link
                      to={`/book?hotel=${hotel.slug}&room=${room.id}`}
                      className="px-4 py-2 bg-[#1A1A1A] text-white text-sm hover:bg-[#333] transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dining Tab */}
        {activeTab === 'dining' && (
          <div className="space-y-8">
            {hotel.dining.map((restaurant) => (
              <div key={restaurant.id} className="animate-in opacity-0 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-[#E5E0D8] overflow-hidden">
                <div className="aspect-video md:aspect-auto overflow-hidden">
                  <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <p className="caption-uppercase text-[#C9A962] mb-2">{restaurant.cuisine}</p>
                  <h3 className="text-2xl font-serif font-light text-[#1A1A1A] mb-3">{restaurant.name}</h3>
                  <p className="text-[#6B6B6B] mb-4">{restaurant.description}</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-[#9A9A9A]"><span className="text-[#1A1A1A]">Hours:</span> {restaurant.hours}</p>
                    <p className="text-[#9A9A9A]"><span className="text-[#1A1A1A]">Dress Code:</span> {restaurant.dressCode}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Spa Tab */}
        {activeTab === 'spa' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="animate-in opacity-0">
                <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">{hotel.spa.name}</h2>
                <p className="text-[#6B6B6B] leading-relaxed">{hotel.spa.description}</p>
              </div>

              <div className="animate-in opacity-0">
                <h3 className="text-xl font-serif font-light text-[#1A1A1A] mb-4">Treatments</h3>
                <div className="space-y-4">
                  {hotel.spa.treatments.map((treatment, idx) => (
                    <div key={idx} className="flex items-start justify-between p-4 bg-white border border-[#E5E0D8]">
                      <div>
                        <h4 className="text-[#1A1A1A] font-medium">{treatment.name}</h4>
                        <p className="text-sm text-[#6B6B6B]">{treatment.description}</p>
                        <p className="text-sm text-[#9A9A9A] mt-1">{treatment.duration}</p>
                      </div>
                      <p className="text-[#C9A962] font-medium">{treatment.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="animate-in opacity-0">
              <div className="bg-[#F5F0E8] p-6">
                <h3 className="text-lg font-serif font-light text-[#1A1A1A] mb-4">Facilities</h3>
                <ul className="space-y-3">
                  {hotel.spa.facilities.map((facility) => (
                    <li key={facility} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                      <Check className="w-4 h-4 text-[#C9A962]" />
                      {facility}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Experiences Tab */}
        {activeTab === 'experiences' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotel.experiences.map((experience) => (
              <div key={experience.id} className="animate-in opacity-0 bg-white border border-[#E5E0D8] overflow-hidden group">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={experience.image} alt={experience.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-light text-[#1A1A1A] mb-2 group-hover:text-[#C9A962] transition-colors">{experience.name}</h3>
                  <p className="text-sm text-[#6B6B6B] mb-3">{experience.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#9A9A9A]">{experience.duration}</span>
                    <span className="text-[#C9A962] font-medium">{experience.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
