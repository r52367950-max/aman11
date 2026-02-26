import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Calendar, MapPin, Bed, Mail, Phone, ArrowRight, Download, Share2 } from 'lucide-react';

export function BookingConfirmationPage() {
  useEffect(() => {
    // Confetti effect could be added here
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Success Header */}
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-aman text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-[#C9A962] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-serif font-light mb-4"
          >
            Booking Confirmed!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/70 max-w-xl mx-auto"
          >
            Thank you for choosing Aman. A confirmation email has been sent to your inbox.
          </motion.p>
        </div>
      </div>

      {/* Booking Details */}
      <div className="container-aman py-12">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white border border-[#E5E0D8] p-8 md:p-12"
          >
            {/* Booking Reference */}
            <div className="text-center mb-8 pb-8 border-b border-[#E5E0D8]">
              <p className="text-sm text-[#9A9A9A] mb-2">Booking Reference</p>
              <p className="text-3xl font-mono text-[#1A1A1A] tracking-wider">AMN-2025-78432</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-[#C9A962]" />
                  <div>
                    <p className="text-sm text-[#9A9A9A]">Property</p>
                    <p className="text-[#1A1A1A] font-medium">Aman New York</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-[#C9A962]" />
                  <div>
                    <p className="text-sm text-[#9A9A9A]">Dates</p>
                    <p className="text-[#1A1A1A] font-medium">Mar 15 - Mar 20, 2025</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Bed className="w-5 h-5 text-[#C9A962]" />
                  <div>
                    <p className="text-sm text-[#9A9A9A]">Room</p>
                    <p className="text-[#1A1A1A] font-medium">Superior Suite</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-[#C9A962]" />
                  <div>
                    <p className="text-sm text-[#9A9A9A]">Email</p>
                    <p className="text-[#1A1A1A] font-medium">guest@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-5 h-5 text-[#C9A962]" />
                  <div>
                    <p className="text-sm text-[#9A9A9A]">Phone</p>
                    <p className="text-[#1A1A1A] font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-[#F5F0E8] p-6 mb-8">
              <h3 className="text-lg font-serif text-[#1A1A1A] mb-4">Price Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Room Rate (5 nights)</span>
                  <span className="text-[#1A1A1A]">$12,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Taxes & Service Charges</span>
                  <span className="text-[#1A1A1A]">$1,440</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B6B6B]">Resort Fee</span>
                  <span className="text-[#1A1A1A]">$250</span>
                </div>
                <div className="border-t border-[#E5E0D8] pt-2 mt-2">
                  <div className="flex justify-between text-lg">
                    <span className="text-[#1A1A1A] font-medium">Total Paid</span>
                    <span className="text-[#C9A962] font-medium">$13,690</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors">
                <Download className="w-4 h-4" />
                Download Invoice
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <h3 className="text-xl font-serif text-[#1A1A1A] mb-4">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border border-[#E5E0D8] p-6">
                <div className="w-12 h-12 bg-[#F5F0E8] flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-[#C9A962]" />
                </div>
                <h4 className="text-[#1A1A1A] font-medium mb-2">Check Your Email</h4>
                <p className="text-sm text-[#6B6B6B]">We've sent your booking confirmation and details.</p>
              </div>
              <div className="bg-white border border-[#E5E0D8] p-6">
                <div className="w-12 h-12 bg-[#F5F0E8] flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-[#C9A962]" />
                </div>
                <h4 className="text-[#1A1A1A] font-medium mb-2">Pre-Arrival</h4>
                <p className="text-sm text-[#6B6B6B]">Our concierge will contact you before your stay.</p>
              </div>
              <div className="bg-white border border-[#E5E0D8] p-6">
                <div className="w-12 h-12 bg-[#F5F0E8] flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-[#C9A962]" />
                </div>
                <h4 className="text-[#1A1A1A] font-medium mb-2">Arrival</h4>
                <p className="text-sm text-[#6B6B6B]">Check-in begins at 3:00 PM.</p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors"
            >
              Return to Homepage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
