import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Travel', 'Wellness', 'Dining', 'Culture', 'Design'];

const articles = [
  {
    id: '1',
    title: 'The Art of Slow Travel',
    excerpt: 'Discover the joy of taking your time and truly experiencing each destination.',
    image: '/images/experiences/to-the-wilds.jpg',
    category: 'Travel',
    date: 'Jan 15, 2025',
    readTime: '5 min read',
    slug: 'art-of-slow-travel',
  },
  {
    id: '2',
    title: 'Meditation Practices from Around the World',
    excerpt: 'Explore ancient meditation techniques and find the practice that resonates with you.',
    image: '/images/experiences/alpine-awakening.jpg',
    category: 'Wellness',
    date: 'Jan 10, 2025',
    readTime: '7 min read',
    slug: 'meditation-practices',
  },
  {
    id: '3',
    title: 'The Secrets of Japanese Cuisine',
    excerpt: 'An inside look at the philosophy and techniques behind washoku.',
    image: '/images/hotels/aman-tokyo.jpg',
    category: 'Dining',
    date: 'Jan 5, 2025',
    readTime: '6 min read',
    slug: 'japanese-cuisine-secrets',
  },
  {
    id: '4',
    title: 'Venice: Beyond the Tourist Trail',
    excerpt: 'Discover hidden corners and local secrets in the floating city.',
    image: '/images/hotels/aman-venice.jpg',
    category: 'Culture',
    date: 'Dec 28, 2024',
    readTime: '8 min read',
    slug: 'venice-beyond-tourist-trail',
  },
  {
    id: '5',
    title: 'Architecture That Honors Nature',
    excerpt: 'How Aman properties are designed to blend seamlessly with their surroundings.',
    image: '/images/hotels/amangiri.jpg',
    category: 'Design',
    date: 'Dec 20, 2024',
    readTime: '5 min read',
    slug: 'architecture-honors-nature',
  },
  {
    id: '6',
    title: 'The Healing Power of Water',
    excerpt: 'Exploring hydrotherapy and the therapeutic benefits of water.',
    image: '/images/misc/aman-at-sea.jpg',
    category: 'Wellness',
    date: 'Dec 15, 2024',
    readTime: '4 min read',
    slug: 'healing-power-of-water',
  },
];

export function JournalPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

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
  }, [filteredArticles]);

  const featuredArticle = articles[0];

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Hero */}
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-aman">
          <p className="caption-uppercase text-white/50 mb-4">Stories & Insights</p>
          <h1 className="text-4xl md:text-6xl font-serif font-light">The Journal</h1>
        </div>
      </div>

      {/* Featured Article */}
      <div className="container-aman py-12">
        <Link to={`/journal/${featuredArticle.slug}`} className="group block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="caption-uppercase text-[#C9A962] mb-4">{featuredArticle.category}</span>
              <h2 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] group-hover:text-[#C9A962] transition-colors mb-4">
                {featuredArticle.title}
              </h2>
              <p className="text-[#6B6B6B] mb-6">{featuredArticle.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-[#9A9A9A]">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {featuredArticle.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {featuredArticle.readTime}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Filter */}
      <div className="container-aman py-8 border-t border-[#E5E0D8]">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'px-4 py-2 text-sm transition-all',
                selectedCategory === category
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-white text-[#6B6B6B] hover:text-[#1A1A1A]'
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div ref={sectionRef} className="container-aman py-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.slice(1).map((article, index) => (
            <Link
              key={article.id}
              to={`/journal/${article.slug}`}
              className="animate-in opacity-0 group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="aspect-[4/3] overflow-hidden mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="caption-uppercase text-[#C9A962]">{article.category}</span>
                <h3 className="text-xl font-serif text-[#1A1A1A] group-hover:text-[#C9A962] transition-colors mt-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] mb-3">{article.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-[#9A9A9A]">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
