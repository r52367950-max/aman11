import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    category: 'Reservations',
    questions: [
      {
        q: 'How do I make a reservation?',
        a: 'You can make a reservation online through our website, by calling our reservations team at +1 (212) 555-0100, or by emailing reservations@aman.com. Our team is available 24/7 to assist you.',
      },
      {
        q: 'What is the cancellation policy?',
        a: 'Cancellation policies vary by property and rate type. Generally, reservations must be cancelled 14 days prior to arrival to avoid charges. Please check the specific terms when making your reservation.',
      },
      {
        q: 'Can I modify my reservation?',
        a: 'Yes, you can modify your reservation by contacting our reservations team. Changes are subject to availability and may incur additional charges.',
      },
    ],
  },
  {
    category: 'Check-in & Check-out',
    questions: [
      {
        q: 'What are the check-in and check-out times?',
        a: 'Check-in is from 3:00 PM and check-out is until 12:00 PM. Early check-in and late check-out may be available upon request, subject to availability.',
      },
      {
        q: 'Do you offer airport transfers?',
        a: 'Yes, we offer private airport transfers at all our properties. Please contact our concierge team to arrange transportation.',
      },
    ],
  },
  {
    category: 'Spa & Wellness',
    questions: [
      {
        q: 'Do I need to book spa treatments in advance?',
        a: 'We recommend booking spa treatments at least 24 hours in advance to ensure availability. You can book through our website, app, or by contacting the spa directly.',
      },
      {
        q: 'What should I wear for spa treatments?',
        a: 'Comfortable, loose-fitting clothing is recommended. Robes and slippers are provided at the spa.',
      },
    ],
  },
  {
    category: 'Dining',
    questions: [
      {
        q: 'Do I need reservations for restaurants?',
        a: 'Reservations are recommended, especially for dinner. You can make reservations through our concierge team or at the property.',
      },
      {
        q: 'Can dietary requirements be accommodated?',
        a: 'Yes, our culinary teams can accommodate most dietary requirements including vegetarian, vegan, gluten-free, and allergies. Please inform us in advance.',
      },
    ],
  },
  {
    category: 'Gift Cards & Shop',
    questions: [
      {
        q: 'How do I purchase a gift card?',
        a: 'Gift cards can be purchased online through our website or at any Aman property. They are available in various denominations and can be delivered via email or printed.',
      },
      {
        q: 'Where can gift cards be used?',
        a: 'Aman gift cards can be redeemed at all Aman properties worldwide for accommodations, dining, spa treatments, and retail purchases.',
      },
    ],
  },
];

export function FaqPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (q) =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Hero */}
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-aman">
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">FAQ</h1>
          <p className="text-white/70 max-w-xl">
            Find answers to commonly asked questions about Aman.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="container-aman py-8">
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9A9A9A]" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
          />
        </div>
      </div>

      {/* FAQs */}
      <div className="container-aman py-8 pb-20">
        <div className="max-w-3xl mx-auto space-y-12">
          {filteredFaqs.map((category) => (
            <div key={category.category}>
              <h2 className="text-2xl font-serif font-light text-[#1A1A1A] mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((q, idx) => (
                  <div key={idx} className="bg-white border border-[#E5E0D8]">
                    <button
                      onClick={() => setOpenQuestion(openQuestion === `${category.category}-${idx}` ? null : `${category.category}-${idx}`)}
                      className="w-full p-6 flex items-center justify-between text-left hover:bg-[#F5F0E8] transition-colors"
                    >
                      <span className="text-[#1A1A1A] font-medium pr-8">{q.q}</span>
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-[#9A9A9A] flex-shrink-0 transition-transform',
                          openQuestion === `${category.category}-${idx}` && 'rotate-180'
                        )}
                      />
                    </button>
                    <AnimatePresence>
                      {openQuestion === `${category.category}-${idx}` && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 text-[#6B6B6B]">{q.a}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#6B6B6B]">No questions found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
