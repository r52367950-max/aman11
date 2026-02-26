import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Calendar,
  Users,
  Bed,
  ChevronRight,
  Check,
  CreditCard,
  Shield,
  Clock,
  MapPin,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getHotelBySlug } from '@/data/hotels';

gsap.registerPlugin(ScrollTrigger);

const steps = ['Dates', 'Room', 'Details', 'Payment'];

export function BookingPage() {
  const [searchParams] = useSearchParams();
  const hotelSlug = searchParams.get('hotel');
  const roomId = searchParams.get('room');
  const hotel = hotelSlug ? getHotelBySlug(hotelSlug) : null;

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 2,
    room: roomId || '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

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
          { opacity: 0, y: 30 },
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

    return () => trigger.kill();
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const selectedRoom = hotel?.rooms.find((r) => r.id === formData.room);
  const nights = formData.checkIn && formData.checkOut
    ? Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const roomPrice = selectedRoom
    ? parseInt(selectedRoom.price.replace(/[^0-9]/g, ''))
    : 0;
  const totalPrice = roomPrice * nights;

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Header */}
      <div className="bg-[#1A1A1A] text-white py-8">
        <div className="container-aman">
          <Link to={hotel ? `/hotels/${hotel.slug}` : '/hotels'} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-light">Book Your Stay</h1>
          {hotel && (
            <p className="text-white/70 mt-2">
              at {hotel.name}, {hotel.location}
            </p>
          )}
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-[#E5E0D8]">
        <div className="container-aman py-6">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={cn(
                    'w-10 h-10 flex items-center justify-center rounded-full transition-all',
                    index <= currentStep
                      ? 'bg-[#C9A962] text-white'
                      : 'bg-[#F5F0E8] text-[#9A9A9A]'
                  )}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm">{index + 1}</span>
                  )}
                </div>
                <span
                  className={cn(
                    'ml-2 mr-4 text-sm hidden md:block',
                    index <= currentStep ? 'text-[#1A1A1A]' : 'text-[#9A9A9A]'
                  )}
                >
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-[#9A9A9A] mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={sectionRef} className="container-aman py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Step 1: Dates */}
            {currentStep === 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="animate-in opacity-0 bg-white border border-[#E5E0D8] p-8"
              >
                <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-6">Select Your Dates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-2 block">Check-in Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9A9A]" />
                      <input
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-2 block">Check-out Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9A9A]" />
                      <input
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-2 block">Number of Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9A9A]" />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                        className="w-full pl-12 pr-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A] appearance-none bg-white"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} Guest{n > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!formData.checkIn || !formData.checkOut}
                    className="px-8 py-3 bg-[#1A1A1A] text-white disabled:bg-[#9A9A9A] hover:bg-[#333] transition-colors flex items-center gap-2"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Room Selection */}
            {currentStep === 1 && hotel && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="animate-in opacity-0 space-y-6"
              >
                <h2 className="text-2xl font-serif font-light text-[#1A1A1A]">Select Your Room</h2>
                {hotel.rooms.map((room) => (
                  <div
                    key={room.id}
                    onClick={() => setFormData({ ...formData, room: room.id })}
                    className={cn(
                      'bg-white border p-6 cursor-pointer transition-all',
                      formData.room === room.id
                        ? 'border-[#C9A962] ring-1 ring-[#C9A962]'
                        : 'border-[#E5E0D8] hover:border-[#C9A962]'
                    )}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full md:w-48 h-32 object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-xl font-serif font-light text-[#1A1A1A]">{room.name}</h3>
                            <p className="text-sm text-[#9A9A9A] mt-1">{room.size}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl text-[#C9A962] font-medium">{room.price}</p>
                            <p className="text-xs text-[#9A9A9A]">per night</p>
                          </div>
                        </div>
                        <p className="text-[#6B6B6B] mt-3 text-sm">{room.description}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {room.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-2 py-1 bg-[#F5F0E8] text-xs text-[#6B6B6B]"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between">
                  <button
                    onClick={handleBack}
                    className="px-8 py-3 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.room}
                    className="px-8 py-3 bg-[#1A1A1A] text-white disabled:bg-[#9A9A9A] hover:bg-[#333] transition-colors flex items-center gap-2"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Guest Details */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="animate-in opacity-0 bg-white border border-[#E5E0D8] p-8"
              >
                <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-6">Guest Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-2 block">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-2 block">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-2 block">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-2 block">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm text-[#6B6B6B] mb-2 block">Special Requests</label>
                    <textarea
                      value={formData.specialRequests}
                      onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A] resize-none"
                    />
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleBack}
                    className="px-8 py-3 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!formData.firstName || !formData.lastName || !formData.email}
                    className="px-8 py-3 bg-[#1A1A1A] text-white disabled:bg-[#9A9A9A] hover:bg-[#333] transition-colors flex items-center gap-2"
                  >
                    Continue <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="animate-in opacity-0 bg-white border border-[#E5E0D8] p-8"
              >
                <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-6">Payment Details</h2>
                <div className="space-y-6">
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-2 block">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9A9A]" />
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-2 block">Cardholder Name</label>
                    <input
                      type="text"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-[#6B6B6B] mb-2 block">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#6B6B6B] mb-2 block">CVV</label>
                      <input
                        type="text"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-[#F5F0E8]">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-[#6B6B6B]">Your payment is secured with 256-bit SSL encryption</span>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handleBack}
                    className="px-8 py-3 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    Back
                  </button>
                  <Link
                    to="/book/confirmation"
                    className="px-8 py-3 bg-[#C9A962] text-white hover:bg-[#B8984D] transition-colors flex items-center gap-2"
                  >
                    Complete Booking <Check className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-40 bg-white border border-[#E5E0D8] p-6">
              <h3 className="text-lg font-serif font-light text-[#1A1A1A] mb-4">Booking Summary</h3>
              {hotel && (
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-[#C9A962]" />
                    <div>
                      <p className="text-sm text-[#9A9A9A]">Property</p>
                      <p className="text-[#1A1A1A]">{hotel.name}</p>
                    </div>
                  </div>
                  {formData.checkIn && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-[#C9A962]" />
                      <div>
                        <p className="text-sm text-[#9A9A9A]">Dates</p>
                        <p className="text-[#1A1A1A]">
                          {formData.checkIn} - {formData.checkOut}
                        </p>
                      </div>
                    </div>
                  )}
                  {nights > 0 && (
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[#C9A962]" />
                      <div>
                        <p className="text-sm text-[#9A9A9A]">Duration</p>
                        <p className="text-[#1A1A1A]">{nights} night{nights > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  )}
                  {selectedRoom && (
                    <div className="flex items-center gap-3">
                      <Bed className="w-5 h-5 text-[#C9A962]" />
                      <div>
                        <p className="text-sm text-[#9A9A9A]">Room</p>
                        <p className="text-[#1A1A1A]">{selectedRoom.name}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {totalPrice > 0 && (
                <>
                  <div className="border-t border-[#E5E0D8] pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B]">Room Rate</span>
                      <span className="text-[#1A1A1A]">{selectedRoom?.price} × {nights}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6B6B6B]">Taxes & Fees</span>
                      <span className="text-[#1A1A1A]">Included</span>
                    </div>
                  </div>
                  <div className="border-t border-[#E5E0D8] pt-4 mt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-[#1A1A1A]">Total</span>
                      <span className="text-xl text-[#C9A962] font-medium">
                        ${totalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
