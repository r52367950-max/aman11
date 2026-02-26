import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === 'error') setStatus('idle');
          }}
          placeholder="Email address"
          disabled={status === 'submitting' || status === 'success'}
          className={cn(
            'w-full px-0 py-4 bg-transparent border-b-2 text-[#1A1A1A] placeholder:text-[#9A9A9A] focus:outline-none transition-colors duration-300',
            status === 'error' ? 'border-red-400' : 'border-[#E5E0D8] focus:border-[#1A1A1A]'
          )}
        />

        <button
          type="submit"
          disabled={status === 'submitting' || status === 'success'}
          className={cn(
            'absolute right-0 top-1/2 -translate-y-1/2 px-6 py-2 text-xs tracking-[0.15em] uppercase transition-all duration-300',
            status === 'success'
              ? 'text-green-600'
              : 'text-[#1A1A1A] hover:text-[#C9A962]'
          )}
        >
          <AnimatePresence mode="wait">
            {status === 'submitting' ? (
              <motion.span
                key="submitting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <span className="w-4 h-4 border-2 border-[#1A1A1A] border-t-transparent rounded-full animate-spin" />
              </motion.span>
            ) : status === 'success' ? (
              <motion.span
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                <Check className="w-5 h-5" />
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2"
              >
                Sign Up
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-sm text-green-600 text-center"
          >
            Thank you for subscribing. You will receive updates about exclusive experiences and new destinations.
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 text-sm text-red-400 text-center"
          >
            Please enter a valid email address.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
