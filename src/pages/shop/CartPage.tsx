import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

const initialCart: CartItem[] = [
  {
    id: '1',
    name: 'Purifying Cleanser',
    price: 85,
    quantity: 1,
    image: '/images/misc/aman-essentials.jpg',
    size: '100ml',
  },
  {
    id: '2',
    name: 'Aman Signature Fragrance',
    price: 280,
    quantity: 1,
    image: '/images/misc/aman-essentials.jpg',
    size: '50ml',
  },
];

export function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Header */}
      <div className="bg-[#1A1A1A] text-white py-8">
        <div className="container-aman">
          <Link to="/shop" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Continue Shopping</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-light">Shopping Cart</h1>
        </div>
      </div>

      {/* Cart Content */}
      <div className="container-aman py-12">
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-[#E5E0D8] p-6 flex gap-6"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-serif font-light text-[#1A1A1A]">{item.name}</h3>
                        {item.size && <p className="text-sm text-[#9A9A9A]">{item.size}</p>}
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#9A9A9A] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 border border-[#E5E0D8] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 border border-[#E5E0D8] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-lg text-[#C9A962] font-medium">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-[#E5E0D8] p-6 sticky top-24">
                <h3 className="text-xl font-serif font-light text-[#1A1A1A] mb-6">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">Subtotal</span>
                    <span className="text-[#1A1A1A]">${subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#6B6B6B]">Shipping</span>
                    <span className="text-[#1A1A1A]">
                      {shipping === 0 ? 'Free' : `$${shipping}`}
                    </span>
                  </div>
                  <div className="border-t border-[#E5E0D8] pt-3">
                    <div className="flex justify-between">
                      <span className="text-[#1A1A1A] font-medium">Total</span>
                      <span className="text-xl text-[#C9A962] font-medium">${total}</span>
                    </div>
                  </div>
                </div>
                <Link
                  to="/shop/checkout"
                  className="w-full py-4 bg-[#1A1A1A] text-white text-center hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Proceed to Checkout
                </Link>
                {subtotal < 100 && (
                  <p className="text-xs text-[#9A9A9A] mt-4 text-center">
                    Add ${100 - subtotal} more for free shipping
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-[#E5E0D8] mx-auto mb-6" />
            <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-4">Your cart is empty</h2>
            <p className="text-[#6B6B6B] mb-8">Discover our collection of luxury products</p>
            <Link to="/shop" className="btn-primary gap-2">
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
