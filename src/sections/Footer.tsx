import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerColumns = [
  {
    title: 'Aman Group',
    links: [
      { label: 'Aman', href: '/' },
      { label: 'Aman Essentials', href: '/shop' },
      { label: 'Aman at Sea', href: '/aman-at-sea' },
      { label: 'The Journal', href: '/journal' },
      { label: 'Membership', href: '/membership' },
    ],
  },
  {
    title: 'Americas & Caribbean',
    links: [
      { label: 'Amanera', href: '/hotels/amanera' },
      { label: 'Amangani', href: '/hotels/amangani' },
      { label: 'Amangiri', href: '/hotels/amangiri' },
      { label: 'Aman New York', href: '/hotels/aman-new-york' },
      { label: 'Amanyara', href: '/hotels/amanyara' },
    ],
  },
  {
    title: 'Europe & Middle East',
    links: [
      { label: 'Amanjena', href: '/hotels/amanjena' },
      { label: 'Aman Le Mélézin', href: '/hotels/aman-le-melezin' },
      { label: 'Amanruya', href: '/hotels/amanruya' },
      { label: 'Aman Venice', href: '/hotels/aman-venice' },
      { label: 'Amanzoe', href: '/hotels/amanzoe' },
    ],
  },
  {
    title: 'Asia & Pacific',
    links: [
      { label: 'Aman Tokyo', href: '/hotels/aman-tokyo' },
      { label: 'Aman Kyoto', href: '/hotels/aman-kyoto' },
      { label: 'Amanpuri', href: '/hotels/amanpuri' },
      { label: 'Amankila', href: '/hotels/amankila' },
      { label: 'Amanoi', href: '/hotels/amanoi' },
    ],
  },
];

const moreInfoLinks = [
  { label: 'Gift Card', href: '/gift-cards' },
  { label: 'Careers', href: '/about/careers' },
  { label: 'Sustainability', href: '/about/sustainability' },
  { label: 'Press', href: '/press' },
  { label: 'Contact Us', href: '/contact' },
];

const legalLinks = [
  { label: 'Privacy Notice', href: '/privacy' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Legal Notice', href: '/terms' },
  { label: 'Digital Accessibility', href: '/accessibility' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const columns = columnsRef.current;
    if (!columns) return;

    const columnElements = columns.children;

    const trigger = ScrollTrigger.create({
      trigger: columns,
      start: 'top 90%',
      onEnter: () => {
        gsap.fromTo(
          columnElements,
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

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#1A1A1A] text-white pt-16 md:pt-20 pb-8">
      <div className="container-aman">
        {/* Main Footer Grid */}
        <div
          ref={columnsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 pb-12 md:pb-16 border-b border-white/10"
        >
          {footerColumns.map((column) => (
            <div key={column.title} className="opacity-0">
              <h4 className="caption-uppercase text-white/50 mb-4 md:mb-6">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors duration-300 link-underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* More Info Column */}
          <div className="opacity-0 col-span-2 md:col-span-1">
            <h4 className="caption-uppercase text-white/50 mb-4 md:mb-6">
              More Information
            </h4>
            <ul className="space-y-3">
              {moreInfoLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-300 link-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="text-2xl tracking-[0.3em] font-light text-white">
            ĀMAN
          </Link>

          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs text-white/50">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white/20 text-white/70 hover:bg-white hover:text-[#1A1A1A] transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            Copyright 2026, Aman Group S.a.r.l. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
