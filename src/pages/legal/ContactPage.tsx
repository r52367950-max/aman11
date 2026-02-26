import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Hero */}
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-aman">
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">Contact Us</h1>
          <p className="text-white/70 max-w-xl">
            We'd love to hear from you. Reach out for reservations, inquiries, or any questions.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-aman py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="space-y-8">
              <div>
                <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center mb-4">
                  <Phone className="w-5 h-5 text-[#C9A962]" />
                </div>
                <h3 className="text-lg font-serif font-light text-[#1A1A1A] mb-2">Phone</h3>
                <p className="text-[#6B6B6B]">+1 (212) 555-0100</p>
                <p className="text-sm text-[#9A9A9A]">24/7 Concierge</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-[#C9A962]" />
                </div>
                <h3 className="text-lg font-serif font-light text-[#1A1A1A] mb-2">Email</h3>
                <p className="text-[#6B6B6B]">reservations@aman.com</p>
                <p className="text-sm text-[#9A9A9A]">For bookings and inquiries</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-[#C9A962]" />
                </div>
                <h3 className="text-lg font-serif font-light text-[#1A1A1A] mb-2">Headquarters</h3>
                <p className="text-[#6B6B6B]">Aman Group S.a.r.l.</p>
                <p className="text-[#6B6B6B]">19 Rue du 11 Novembre</p>
                <p className="text-[#6B6B6B]">L-8081 Bertrange, Luxembourg</p>
              </div>

              <div>
                <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center mb-4">
                  <Clock className="w-5 h-5 text-[#C9A962]" />
                </div>
                <h3 className="text-lg font-serif font-light text-[#1A1A1A] mb-2">Hours</h3>
                <p className="text-[#6B6B6B]">Reservations: 24/7</p>
                <p className="text-[#6B6B6B]">Customer Service: 9am - 6pm CET</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E5E0D8] p-8">
              <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-6">Send Us a Message</h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-serif font-light text-[#1A1A1A] mb-2">Message Sent!</h3>
                  <p className="text-[#6B6B6B]">We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm text-[#6B6B6B] mb-2 block">Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#6B6B6B] mb-2 block">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-2 block">Subject</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A] bg-white"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Reservation Inquiry</option>
                      <option value="experience">Experience Booking</option>
                      <option value="spa">Spa & Wellness</option>
                      <option value="dining">Dining</option>
                      <option value="wedding">Wedding & Events</option>
                      <option value="shop">Shop Order</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-[#6B6B6B] mb-2 block">Message</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={6}
                      className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A] resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
