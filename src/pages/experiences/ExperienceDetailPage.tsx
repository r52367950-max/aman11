import { useRef, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Check,
  Star,
  ArrowRight,
  Heart,
  Share2,
  Mountain,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getExperienceBySlug } from '@/data/experiences';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const experience = getExperienceBySlug(slug || '');
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    if (!experience) return;

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
  }, [experience]);

  if (!experience) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] pt-32 text-center">
        <h1 className="text-3xl font-serif font-light text-[#1A1A1A]">Experience not found</h1>
        <Link to="/experiences" className="text-[#C9A962] mt-4 inline-block">
          Back to Experiences
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % experience.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + experience.gallery.length) % experience.gallery.length);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Hero Gallery */}
      <div className="relative h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            src={experience.gallery[currentImageIndex]}
            alt={experience.name}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

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

        <div className="absolute bottom-24 right-4 bg-black/50 px-3 py-1 text-white text-sm">
          {currentImageIndex + 1} / {experience.gallery.length}
        </div>

        <Link
          to="/experiences"
          className="absolute top-24 left-4 flex items-center gap-2 text-white hover:text-[#C9A962] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="text-sm">Back to Experiences</span>
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="container-aman">
            <div className="flex items-start justify-between">
              <div>
                <div className="px-3 py-1 bg-[#C9A962] inline-block mb-4">
                  <span className="text-xs tracking-wider uppercase text-white">
                    {experience.category}
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-serif font-light text-white mb-4">
                  {experience.name}
                </h1>
                <div className="flex items-center gap-4 text-white/70">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{experience.duration}</span>
                  </div>
                </div>
              </div>

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

      {/* Content */}
      <div ref={sectionRef} className="container-aman py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Description */}
            <section className="animate-in opacity-0">
              <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Experience Overview</h2>
              <p className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                {experience.fullDescription}
              </p>
            </section>

            {/* Highlights */}
            <section className="animate-in opacity-0">
              <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experience.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white border border-[#E5E0D8]">
                    <Check className="w-5 h-5 text-[#C9A962] flex-shrink-0 mt-0.5" />
                    <span className="text-[#6B6B6B]">{highlight}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section className="animate-in opacity-0">
              <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Itinerary</h2>
              <div className="space-y-4">
                {experience.itinerary.map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 bg-white border border-[#E5E0D8]">
                    <div className="w-24 flex-shrink-0">
                      <span className="text-sm font-medium text-[#C9A962]">{item.time}</span>
                    </div>
                    <div>
                      <h4 className="text-[#1A1A1A] font-medium mb-1">{item.activity}</h4>
                      <p className="text-sm text-[#6B6B6B]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Inclusions & Exclusions */}
            <section className="animate-in opacity-0 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-serif font-light text-[#1A1A1A] mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {experience.inclusions.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                      <Check className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-serif font-light text-[#1A1A1A] mb-4">Not Included</h3>
                <ul className="space-y-2">
                  {experience.exclusions.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[#6B6B6B]">
                      <span className="w-4 h-4 flex items-center justify-center text-red-400">×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Reviews */}
            <section className="animate-in opacity-0">
              <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Guest Reviews</h2>
              <div className="space-y-6">
                {experience.reviews.map((review) => (
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
                        <span>Verified experience</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-40 space-y-6">
              {/* Quick Info */}
              <div className="bg-white border border-[#E5E0D8] p-6">
                <h3 className="text-lg font-serif font-light text-[#1A1A1A] mb-4">Experience Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-[#C9A962]" />
                    <div>
                      <p className="text-sm text-[#9A9A9A]">Price</p>
                      <p className="text-[#1A1A1A]">{experience.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#C9A962]" />
                    <div>
                      <p className="text-sm text-[#9A9A9A]">Duration</p>
                      <p className="text-[#1A1A1A]">{experience.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#C9A962]" />
                    <div>
                      <p className="text-sm text-[#9A9A9A]">Group Size</p>
                      <p className="text-[#1A1A1A]">{experience.groupSize}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mountain className="w-5 h-5 text-[#C9A962]" />
                    <div>
                      <p className="text-sm text-[#9A9A9A]">Difficulty</p>
                      <p className="text-[#1A1A1A]">{experience.difficulty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#C9A962]" />
                    <div>
                      <p className="text-sm text-[#9A9A9A]">Best Time</p>
                      <p className="text-[#1A1A1A]">{experience.bestTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Book Now */}
              <div className="bg-[#1A1A1A] p-6 text-white">
                <h3 className="text-lg font-serif font-light mb-4">Book This Experience</h3>
                <p className="text-white/70 text-sm mb-6">
                  Reserve your spot for this unforgettable journey.
                </p>
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full py-4 bg-[#C9A962] text-white text-center text-sm tracking-[0.1em] uppercase hover:bg-[#B8984D] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Requirements */}
              <div className="bg-[#F5F0E8] p-6">
                <h3 className="text-lg font-serif font-light text-[#1A1A1A] mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {experience.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[#6B6B6B]">
                      <Check className="w-4 h-4 text-[#C9A962] mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white max-w-md w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Book {experience.name}</h3>
              <p className="text-[#6B6B6B] mb-6">Fill in your details and our team will contact you to confirm your booking.</p>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                />
                <input
                  type="date"
                  placeholder="Preferred Date"
                  className="w-full p-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                />
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 py-3 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <Link
                    to="/book/confirmation"
                    className="flex-1 py-3 bg-[#C9A962] text-white text-center hover:bg-[#B8984D] transition-colors"
                  >
                    Submit Request
                  </Link>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
