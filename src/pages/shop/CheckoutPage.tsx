import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, CreditCard, Shield } from 'lucide-react';

export function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Header */}
      <div className="bg-[#1A1A1A] text-white py-8">
        <div className="container-aman">
          <Link to="/shop/cart" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Cart</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-light">Checkout</h1>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-[#E5E0D8]">
        <div className="container-aman py-6">
          <div className="flex items-center justify-center">
            {['Information', 'Shipping', 'Payment'].map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                    i + 1 <= step ? 'bg-[#C9A962] text-white' : 'bg-[#F5F0E8] text-[#9A9A9A]'
                  }`}
                >
                  {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`ml-2 mr-6 text-sm ${i + 1 <= step ? 'text-[#1A1A1A]' : 'text-[#9A9A9A]'}`}>
                  {s}
                </span>
                {i < 2 && <div className="w-8 h-px bg-[#E5E0D8] mr-6" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="container-aman py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border border-[#E5E0D8] p-8">
              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                      />
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-6">Shipping Method</h2>
                  <div className="space-y-4">
                    {[
                      { name: 'Standard Shipping', time: '5-7 business days', price: 15 },
                      { name: 'Express Shipping', time: '2-3 business days', price: 25 },
                      { name: 'Overnight Shipping', time: 'Next business day', price: 45 },
                    ].map((method) => (
                      <label
                        key={method.name}
                        className="flex items-center justify-between p-4 border border-[#E5E0D8] cursor-pointer hover:border-[#1A1A1A] transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <input type="radio" name="shipping" className="w-4 h-4" />
                          <div>
                            <p className="text-[#1A1A1A] font-medium">{method.name}</p>
                            <p className="text-sm text-[#9A9A9A]">{method.time}</p>
                          </div>
                        </div>
                        <p className="text-[#C9A962] font-medium">${method.price}</p>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-6">Payment</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9A9A]" />
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      value={formData.cardName}
                      onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                      className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formData.expiry}
                        onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                    <div className="flex items-center gap-2 p-4 bg-[#F5F0E8]">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-[#6B6B6B]">Your payment is secured with 256-bit SSL encryption</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="px-8 py-3 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
                  >
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  className="ml-auto px-8 py-3 bg-[#1A1A1A] text-white hover:bg-[#333] transition-colors"
                >
                  {step === 3 ? 'Complete Order' : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E5E0D8] p-6 sticky top-24">
              <h3 className="text-lg font-serif font-light text-[#1A1A1A] mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">Subtotal</span>
                  <span className="text-[#1A1A1A]">$365</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">Shipping</span>
                  <span className="text-[#1A1A1A]">$15</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">Tax</span>
                  <span className="text-[#1A1A1A]">$30.40</span>
                </div>
                <div className="border-t border-[#E5E0D8] pt-3">
                  <div className="flex justify-between">
                    <span className="text-[#1A1A1A] font-medium">Total</span>
                    <span className="text-xl text-[#C9A962] font-medium">$410.40</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
