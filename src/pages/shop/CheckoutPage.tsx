import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, CreditCard, Shield } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { calculateShopPricing } from '@/lib/pricing';

const shippingMethods = [
  { name: 'Standard Shipping', time: '5-7 business days', price: 15 },
  { name: 'Express Shipping', time: '2-3 business days', price: 25 },
  { name: 'Overnight Shipping', time: 'Next business day', price: 45 },
] as const;

const MOCK_ORDER_DELAY_MS = 1000;

export function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    phone: '',
    shippingMethod: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const { items, totalPrice, clearCart } = useCart();
  const subtotal = totalPrice;

  const pricing = useMemo(() => {
    const selectedShipping = formData.shippingMethod
      ? shippingMethods.find((method) => method.name === formData.shippingMethod)?.price
      : undefined;

    return calculateShopPricing(subtotal, selectedShipping);
  }, [subtotal, formData.shippingMethod]);

  const shipping = pricing.shipping;
  const tax = pricing.tax;
  const total = pricing.total;

  const validateStep = () => {
    const errors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.email.trim()) errors.email = 'Email is required.';
      if (!formData.firstName.trim()) errors.firstName = 'First name is required.';
      if (!formData.lastName.trim()) errors.lastName = 'Last name is required.';
      if (!formData.address.trim()) errors.address = 'Address is required.';
      if (!formData.city.trim()) errors.city = 'City is required.';
      if (!formData.country.trim()) errors.country = 'Country is required.';
      if (!formData.postalCode.trim()) errors.postalCode = 'Postal code is required.';
      if (!formData.phone.trim()) errors.phone = 'Phone is required.';
    }

    if (step === 2 && !formData.shippingMethod) {
      errors.shippingMethod = 'Please choose a shipping method.';
    }

    if (step === 3) {
      if (!formData.cardName.trim()) errors.cardName = 'Cardholder name is required.';
      if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s+/g, ''))) {
        errors.cardNumber = 'Card number must be 13 to 19 digits.';
      }
      if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(formData.expiry)) {
        errors.expiry = 'Expiry must be in MM/YY format.';
      }
      if (!/^\d{3,4}$/.test(formData.cvv)) {
        errors.cvv = 'CVV must be 3 or 4 digits.';
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const placeOrder = async () => {
    if (!validateStep()) {
      return;
    }

    if (items.length === 0) {
      setSubmitError('Your cart is empty. Please add products before checkout.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, MOCK_ORDER_DELAY_MS));
      const response = { ok: true, orderNumber: `AMAN-${Date.now().toString().slice(-8)}` };

      if (!response.ok) {
        throw new Error('order failed');
      }

      clearCart();
      setOrderNumber(response.orderNumber);
    } catch {
      setSubmitError('We could not complete your order right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateStep()) {
      return;
    }

    if (step < 3) {
      setStep(step + 1);
      return;
    }

    void placeOrder();
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      <div className="bg-[#1A1A1A] text-white py-8">
        <div className="container-aman">
          <Link to="/shop/cart" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Cart</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-light">Checkout</h1>
        </div>
      </div>

      <div className="bg-white border-b border-[#E5E0D8]">
        <div className="container-aman py-6">
          <div className="flex items-center justify-center">
            {['Information', 'Shipping', 'Payment'].map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${i + 1 <= step ? 'bg-[#C9A962] text-white' : 'bg-[#F5F0E8] text-[#9A9A9A]'}`}>
                  {i + 1 < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`ml-2 mr-6 text-sm ${i + 1 <= step ? 'text-[#1A1A1A]' : 'text-[#9A9A9A]'}`}>{s}</span>
                {i < 2 && <div className="w-8 h-px bg-[#E5E0D8] mr-6" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-aman py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white border border-[#E5E0D8] p-8">
              {orderNumber && (
                <div className="mb-6 border border-green-200 bg-green-50 p-4 text-green-700">
                  Order completed successfully. Your order number is <strong>{orderNumber}</strong>.
                </div>
              )}

              {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <input type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]" />
                      {fieldErrors.email && <p className="text-sm text-red-600 mt-1">{fieldErrors.email}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input type="text" placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]" />
                        {fieldErrors.firstName && <p className="text-sm text-red-600 mt-1">{fieldErrors.firstName}</p>}
                      </div>
                      <div>
                        <input type="text" placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]" />
                        {fieldErrors.lastName && <p className="text-sm text-red-600 mt-1">{fieldErrors.lastName}</p>}
                      </div>
                    </div>
                    <div>
                      <input type="text" placeholder="Address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]" />
                      {fieldErrors.address && <p className="text-sm text-red-600 mt-1">{fieldErrors.address}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input type="text" placeholder="City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]" />
                        {fieldErrors.city && <p className="text-sm text-red-600 mt-1">{fieldErrors.city}</p>}
                      </div>
                      <div>
                        <input type="text" placeholder="Postal Code" value={formData.postalCode} onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]" />
                        {fieldErrors.postalCode && <p className="text-sm text-red-600 mt-1">{fieldErrors.postalCode}</p>}
                      </div>
                    </div>
                    <div>
                      <input type="text" placeholder="Country" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]" />
                      {fieldErrors.country && <p className="text-sm text-red-600 mt-1">{fieldErrors.country}</p>}
                    </div>
                    <div>
                      <input type="tel" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]" />
                      {fieldErrors.phone && <p className="text-sm text-red-600 mt-1">{fieldErrors.phone}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-6">Shipping Method</h2>
                  <div className="space-y-4">
                    {shippingMethods.map((method) => (
                      <label key={method.name} className="flex items-center justify-between p-4 border border-[#E5E0D8] cursor-pointer hover:border-[#1A1A1A] transition-colors">
                        <div className="flex items-center gap-4">
                          <input
                            type="radio"
                            name="shipping"
                            checked={formData.shippingMethod === method.name}
                            onChange={() => setFormData({ ...formData, shippingMethod: method.name })}
                            className="w-4 h-4"
                          />
                          <div>
                            <p className="text-[#1A1A1A] font-medium">{method.name}</p>
                            <p className="text-sm text-[#9A9A9A]">{method.time}</p>
                          </div>
                        </div>
                        <p className="text-[#C9A962] font-medium">${method.price}</p>
                      </label>
                    ))}
                    {fieldErrors.shippingMethod && <p className="text-sm text-red-600 mt-1">{fieldErrors.shippingMethod}</p>}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-6">Payment</h2>
                  <div className="space-y-4">
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9A9A]" />
                      <input type="text" placeholder="Card Number" value={formData.cardNumber} onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })} className="w-full pl-12 pr-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]" />
                    </div>
                    {fieldErrors.cardNumber && <p className="text-sm text-red-600 -mt-2">{fieldErrors.cardNumber}</p>}
                    <input type="text" placeholder="Cardholder Name" value={formData.cardName} onChange={(e) => setFormData({ ...formData, cardName: e.target.value })} className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]" />
                    {fieldErrors.cardName && <p className="text-sm text-red-600 -mt-2">{fieldErrors.cardName}</p>}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input type="text" placeholder="MM/YY" value={formData.expiry} onChange={(e) => setFormData({ ...formData, expiry: e.target.value })} className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]" />
                        {fieldErrors.expiry && <p className="text-sm text-red-600 mt-1">{fieldErrors.expiry}</p>}
                      </div>
                      <div>
                        <input type="text" placeholder="CVV" value={formData.cvv} onChange={(e) => setFormData({ ...formData, cvv: e.target.value })} className="w-full px-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]" />
                        {fieldErrors.cvv && <p className="text-sm text-red-600 mt-1">{fieldErrors.cvv}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 p-4 bg-[#F5F0E8]">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-[#6B6B6B]">Your payment is secured with 256-bit SSL encryption</span>
                    </div>
                    {submitError && (
                      <div className="border border-red-200 bg-red-50 p-4 text-sm text-red-700 flex items-center justify-between gap-3">
                        <span>{submitError}</span>
                        <button type="button" onClick={() => void placeOrder()} disabled={isSubmitting} className="underline underline-offset-2 disabled:opacity-60">Retry</button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button type="button" onClick={() => setStep(step - 1)} className="px-8 py-3 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors">
                    Back
                  </button>
                )}
                <button type="submit" disabled={isSubmitting || !!orderNumber} className="ml-auto px-8 py-3 bg-[#1A1A1A] text-white hover:bg-[#333] disabled:opacity-60 transition-colors">
                  {step === 3 ? (isSubmitting ? 'Submitting...' : 'Complete Order') : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E5E0D8] p-6 sticky top-24">
              <h3 className="text-lg font-serif font-light text-[#1A1A1A] mb-6">Order Summary</h3>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">Subtotal</span>
                  <span className="text-[#1A1A1A]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">Shipping</span>
                  <span className="text-[#1A1A1A]">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6B6B6B]">Tax</span>
                  <span className="text-[#1A1A1A]">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-[#E5E0D8] pt-3">
                  <div className="flex justify-between">
                    <span className="text-[#1A1A1A] font-medium">Total</span>
                    <span className="text-xl text-[#C9A962] font-medium">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              {items.length === 0 && !orderNumber && (
                <p className="text-sm text-[#9A9A9A]">Your cart is currently empty. Add items before placing an order.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
