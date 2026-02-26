import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, ExternalLink, FileText, Image as ImageIcon, Video } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pressReleases = [
  {
    date: 'January 10, 2025',
    title: 'Aman Announces New Property in the Swiss Alps',
    excerpt: 'Aman continues its European expansion with a new mountain retreat scheduled to open in 2027.',
  },
  {
    date: 'December 15, 2024',
    title: 'Aman at Sea: First Yacht Details Revealed',
    excerpt: 'The 183-meter Amangati will set sail in 2026, offering curated Mediterranean journeys.',
  },
  {
    date: 'November 28, 2024',
    title: 'Aman Spa Wins Global Wellness Award',
    excerpt: 'Recognized for excellence in holistic wellness and innovative treatment offerings.',
  },
];

const mediaKits = [
  { name: 'Brand Guidelines', type: 'PDF', size: '2.4 MB', icon: FileText },
  { name: 'Image Library', type: 'ZIP', size: '156 MB', icon: ImageIcon },
  { name: 'Video Assets', type: 'ZIP', size: '423 MB', icon: Video },
];

export function PressPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.animate-in');
    if (!elements) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          }
        );
      },
      once: true,
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Hero */}
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-aman">
          <p className="caption-uppercase text-white/50 mb-4">Media Center</p>
          <h1 className="text-4xl md:text-5xl font-serif font-light">Press</h1>
          <p className="text-white/70 mt-4 max-w-xl">
            News, press releases, and media resources for journalists and partners.
          </p>
        </div>
      </div>

      {/* Press Releases */}
      <div ref={sectionRef} className="container-aman py-20">
        <div className="text-center mb-16">
          <p className="caption-uppercase text-[#9A9A9A] mb-4">Latest News</p>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A]">
            Press Releases
          </h2>
        </div>
        <div className="max-w-4xl mx-auto space-y-6">
          {pressReleases.map((release, index) => (
            <motion.div
              key={release.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="animate-in opacity-0 bg-white border border-[#E5E0D8] p-6 hover:border-[#C9A962] transition-colors"
            >
              <p className="text-sm text-[#9A9A9A] mb-2">{release.date}</p>
              <h3 className="text-xl font-serif text-[#1A1A1A] mb-2">{release.title}</h3>
              <p className="text-[#6B6B6B] mb-4">{release.excerpt}</p>
              <Link
                to="#"
                className="inline-flex items-center gap-2 text-sm text-[#C9A962] hover:underline"
              >
                Read More
                <ExternalLink className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Media Kit */}
      <div className="bg-white py-20">
        <div className="container-aman">
          <div className="text-center mb-16">
            <p className="caption-uppercase text-[#9A9A9A] mb-4">Resources</p>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-[#1A1A1A]">
              Media Kit
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {mediaKits.map((kit, index) => (
                <motion.div
                  key={kit.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-6 bg-[#F5F0E8]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#1A1A1A] flex items-center justify-center">
                      <kit.icon className="w-5 h-5 text-[#C9A962]" />
                    </div>
                    <div>
                      <h4 className="font-serif text-[#1A1A1A]">{kit.name}</h4>
                      <p className="text-sm text-[#9A9A9A]">{kit.type} • {kit.size}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-[#1A1A1A] text-white py-20">
        <div className="container-aman text-center">
          <h3 className="text-2xl md:text-3xl font-serif mb-4">
            Press Inquiries
          </h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            For media inquiries, interview requests, or additional information, please contact our press team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:press@aman.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A962] text-white hover:bg-[#B8984D] transition-colors"
            >
              Contact Press Team
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
