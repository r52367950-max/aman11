import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { cn } from '@/lib/utils';

const mainNavLinks = [
  { label: 'Hotels & Resorts', href: '/hotels' },
  { label: 'Experiences', href: '/experiences' },
  { label: 'Journeys', href: '/journal' },
  { label: 'Aman at Sea', href: '/aman-at-sea' },
  { label: 'Gift Cards', href: '/gift-cards' },
];

const menuSections = [
  {
    title: 'Discover',
    links: [
      { label: 'Hotels & Resorts', href: '/hotels' },
      { label: 'Experiences', href: '/experiences' },
      { label: 'Aman at Sea', href: '/aman-at-sea' },
      { label: 'The Journal', href: '/journal' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Spa & Wellness', href: '/spa' },
      { label: 'Dining', href: '/dining' },
      { label: 'Concierge', href: '/concierge' },
      { label: 'Weddings', href: '/weddings' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Gift Cards', href: '/gift-cards' },
      { label: 'Shopping Cart', href: '/shop/cart' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '/about/our-story' },
      { label: 'Sustainability', href: '/about/sustainability' },
      { label: 'Careers', href: '/about/careers' },
      { label: 'Press', href: '/press' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Membership', href: '/membership' },
    ],
  },
];

export function Header() {
  const { isScrolled } = useScrollPosition();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    navigate(href);
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          isScrolled
            ? 'bg-[#F5F0E8]/95 backdrop-blur-md border-b border-[#E5E0D8]'
            : 'bg-transparent'
        )}
      >
        <div className="container-aman">
          <div className="flex items-center justify-between h-20">
            {/* Left - Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-3 group"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-[#1A1A1A] transition-transform duration-300 group-hover:scale-110" />
              <span className="label-uppercase hidden sm:inline">Menu</span>
            </button>

            {/* Center - Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <h1 className="text-2xl md:text-3xl tracking-[0.3em] font-light text-[#1A1A1A]">
                ĀMAN
              </h1>
            </Link>

            {/* Right - Language & Reserve */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6">
                {mainNavLinks.slice(0, 3).map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="label-uppercase text-[#1A1A1A] hover:text-[#C9A962] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 group"
                >
                  <span className="label-uppercase hidden sm:inline">English</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                </button>

                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 bg-white shadow-lg border border-[#E5E0D8] min-w-[120px]"
                    >
                      {['English', '中文', '日本語', 'Français'].map((lang) => (
                        <button
                          key={lang}
                          onClick={() => setIsLangOpen(false)}
                          className="w-full px-4 py-3 text-left text-sm hover:bg-[#F5F0E8] transition-colors"
                        >
                          {lang}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Reserve Button */}
              <Link to="/book" className="btn-primary hidden md:inline-flex">
                Reserve
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#F5F0E8] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 left-6 md:left-12 flex items-center gap-3 group z-10"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-[#1A1A1A] transition-transform duration-300 group-hover:rotate-90" />
              <span className="label-uppercase">Close</span>
            </button>

            {/* Menu Content */}
            <div className="min-h-full flex flex-col lg:flex-row pt-20 pb-12">
              {/* Left - Navigation Sections */}
              <div className="flex-1 px-6 md:px-12 lg:px-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                  {menuSections.map((section, sectionIndex) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + sectionIndex * 0.08, duration: 0.5 }}
                      className="space-y-4"
                    >
                      <h3 className="caption-uppercase text-[#8B8B8B]">{section.title}</h3>
                      <ul className="space-y-3">
                        {section.links.map((link) => (
                          <li key={link.label}>
                            <button
                              onClick={() => handleNavClick(link.href)}
                              className="text-lg font-serif font-light text-[#1A1A1A] hover:text-[#C9A962] transition-colors duration-300 text-left"
                            >
                              {link.label}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="mt-12 pt-8 border-t border-[#E5E0D8]"
                >
                  <div className="flex flex-wrap gap-4">
                    <Link to="/book" onClick={() => setIsMenuOpen(false)} className="btn-primary">
                      Book Your Stay
                    </Link>
                    <Link to="/membership" onClick={() => setIsMenuOpen(false)} className="btn-secondary">
                      Join Membership
                    </Link>
                    <Link to="/shop" onClick={() => setIsMenuOpen(false)} className="btn-secondary">
                      Visit Shop
                    </Link>
                  </div>
                </motion.div>
              </div>

              {/* Right - Featured Image */}
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="hidden lg:block w-1/3 xl:w-1/4 relative mt-8 lg:mt-0"
              >
                <div className="sticky top-24 mx-6 lg:mx-0 lg:mr-12">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src="/images/hotels/aman-new-york.jpg"
                      alt="Aman New York"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="caption-uppercase mb-2 text-white/80">Featured Destination</p>
                      <h3 className="text-2xl font-serif font-light">Aman New York</h3>
                      <p className="mt-2 text-white/80 text-sm">East meets West in Manhattan</p>
                      <button
                        onClick={() => handleNavClick('/hotels/aman-new-york')}
                        className="mt-4 text-sm underline underline-offset-4 hover:text-[#C9A962] transition-colors"
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
