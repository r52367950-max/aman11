import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gift, Check, Mail, Printer } from 'lucide-react';
import { cn } from '@/lib/utils';

const denominations = [100, 250, 500, 1000, 2500, 5000];

export function GiftCardsPage() {
  const [selectedAmount, setSelectedAmount] = useState(500);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'print'>('email');
  const [customAmount, setCustomAmount] = useState('');

  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src="/images/misc/gift-card.jpg"
          alt="Aman Gift Cards"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <Gift className="w-12 h-12 mx-auto mb-4 text-[#C9A962]" />
            <h1 className="text-4xl md:text-6xl font-serif font-light">
              Aman Gift Cards
            </h1>
            <p className="mt-6 text-white/80 max-w-xl mx-auto">
              The perfect gift for any occasion
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-aman py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Card Preview */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="aspect-[3/2] bg-gradient-to-br from-[#1A1A1A] to-[#333] p-8 flex flex-col justify-between text-white relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A962]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div>
                <p className="text-2xl tracking-[0.3em] font-light">ĀMAN</p>
              </div>
              <div>
                <p className="text-white/60 text-sm mb-1">Gift Card</p>
                <p className="text-5xl font-serif">${finalAmount.toLocaleString()}</p>
              </div>
              <div className="absolute bottom-4 right-4">
                <Gift className="w-8 h-8 text-[#C9A962]/50" />
              </div>
            </motion.div>

            <div className="mt-8 bg-white border border-[#E5E0D8] p-6">
              <h3 className="text-lg font-serif text-[#1A1A1A] mb-4">Gift Card Details</h3>
              <ul className="space-y-3 text-sm text-[#6B6B6B]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C9A962] mt-0.5" />
                  Redeemable at all Aman properties worldwide
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C9A962] mt-0.5" />
                  Valid for 5 years from date of purchase
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C9A962] mt-0.5" />
                  Can be used for accommodations, dining, spa, and more
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C9A962] mt-0.5" />
                  No additional fees or expiration penalties
                </li>
              </ul>
            </div>
          </div>

          {/* Purchase Form */}
          <div>
            <h2 className="text-2xl font-serif text-[#1A1A1A] mb-6">Purchase Gift Card</h2>

            {/* Amount Selection */}
            <div className="mb-6">
              <label className="text-sm text-[#6B6B6B] mb-3 block">Select Amount</label>
              <div className="grid grid-cols-3 gap-3">
                {denominations.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={cn(
                      'py-3 border transition-colors',
                      selectedAmount === amount && !customAmount
                        ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                        : 'bg-white text-[#1A1A1A] border-[#E5E0D8] hover:border-[#1A1A1A]'
                    )}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                />
              </div>
            </div>

            {/* Delivery Method */}
            <div className="mb-6">
              <label className="text-sm text-[#6B6B6B] mb-3 block">Delivery Method</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setDeliveryMethod('email')}
                  className={cn(
                    'flex-1 py-4 border flex items-center justify-center gap-2 transition-colors',
                    deliveryMethod === 'email'
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white text-[#1A1A1A] border-[#E5E0D8] hover:border-[#1A1A1A]'
                  )}
                >
                  <Mail className="w-4 h-4" />
                  Email
                </button>
                <button
                  onClick={() => setDeliveryMethod('print')}
                  className={cn(
                    'flex-1 py-4 border flex items-center justify-center gap-2 transition-colors',
                    deliveryMethod === 'print'
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-white text-[#1A1A1A] border-[#E5E0D8] hover:border-[#1A1A1A]'
                  )}
                >
                  <Printer className="w-4 h-4" />
                  Print at Home
                </button>
              </div>
            </div>

            {/* Recipient Details */}
            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Recipient Name"
                className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
              />
              {deliveryMethod === 'email' && (
                <input
                  type="email"
                  placeholder="Recipient Email"
                  className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                />
              )}
              <textarea
                placeholder="Personal Message (optional)"
                rows={3}
                className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A] resize-none"
              />
            </div>

            {/* Your Details */}
            <div className="space-y-4 mb-8">
              <h3 className="text-lg font-serif text-[#1A1A1A]">Your Details</h3>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            {/* Total & CTA */}
            <div className="border-t border-[#E5E0D8] pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[#1A1A1A] font-medium">Total</span>
                <span className="text-2xl text-[#C9A962] font-medium">${finalAmount.toLocaleString()}</span>
              </div>
              <Link
                to="/shop/checkout"
                className="w-full py-4 bg-[#1A1A1A] text-white text-center hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
              >
                Purchase Gift Card
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
