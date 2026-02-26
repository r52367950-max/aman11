import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, ArrowRight, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { getAllExperiences } from '@/data/experiences';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Mountains', 'Beach', 'City', 'Nature', 'Cultural'];

export function ExperiencesListPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const experiences = getAllExperiences();

  const filteredExperiences = experiences.filter((exp) => {
    const matchesCategory =
      selectedCategory === 'All' || exp.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch =
      exp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.experience-card');

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      onEnter: () => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50 },
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
  }, [filteredExperiences]);

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Hero Header */}
      <div className="bg-[#1A1A1A] text-white py-16 md:py-24">
        <div className="container-aman">
          <p className="caption-uppercase text-white/50 mb-4">Curated Journeys</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light mb-6">
            Experiences
          </h1>
          <p className="text-white/70 max-w-2xl text-lg">
            Discover extraordinary experiences crafted by Aman, from alpine adventures
            to tropical escapes, each designed to create lasting memories.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-20 z-40 bg-[#F5F0E8] border-b border-[#E5E0D8]">
        <div className="container-aman py-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
              <input
                type="text"
                placeholder="Search experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-[#E5E0D8] text-sm focus:outline-none focus:border-[#1A1A1A]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <Filter className="w-4 h-4 text-[#9A9A9A] flex-shrink-0" />
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-4 py-2 text-sm whitespace-nowrap transition-all',
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
        </div>
      </div>

      {/* Experiences Grid */}
      <div ref={sectionRef} className="container-aman py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredExperiences.map((experience) => (
            <Link
              key={experience.id}
              to={`/experiences/${experience.slug}`}
              className="experience-card opacity-0 group"
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white border border-[#E5E0D8] overflow-hidden hover:border-[#C9A962] transition-all duration-300"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm">
                    <span className="text-xs tracking-wider uppercase text-[#1A1A1A]">
                      {experience.category}
                    </span>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-2">
                      {experience.name}
                    </h3>
                    <p className="text-white/80">{experience.shortDescription}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4 text-sm text-[#6B6B6B]">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-[#C9A962]" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#C9A962]" />
                      <span>{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-[#C9A962]" />
                      <span>{experience.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {experience.highlights.slice(0, 2).map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-[#F5F0E8] text-xs text-[#6B6B6B]"
                        >
                          {highlight.split(' ').slice(0, 3).join(' ')}...
                        </span>
                      ))}
                    </div>
                    <span className="flex items-center gap-1 text-sm text-[#C9A962] group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {filteredExperiences.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#6B6B6B]">No experiences found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
