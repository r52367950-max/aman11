import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Hotel } from '@/types';

interface HotelCardProps {
  hotel: Hotel;
  index: number;
}

export function HotelCard({ hotel, index }: HotelCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#E5E0D8]">
        <img
          ref={imageRef}
          src={hotel.image}
          alt={hotel.name}
          className={cn(
            'w-full h-full object-cover transition-transform duration-700',
            isHovered ? 'scale-105' : 'scale-100'
          )}
          loading="lazy"
        />

        {/* Overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-black/20 transition-opacity duration-500',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* Discover More - Appears on Hover */}
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center transition-all duration-500',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        >
          <span className="flex items-center gap-2 text-white text-xs tracking-[0.15em] uppercase">
            Discover more
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-5 space-y-2">
        {/* Location */}
        <p className="caption-uppercase text-[#9A9A9A]">{hotel.location}</p>

        {/* Name */}
        <h3 className="text-2xl font-serif font-light text-[#1A1A1A] group-hover:text-[#C9A962] transition-colors duration-300">
          {hotel.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#6B6B6B] line-clamp-2 leading-relaxed">
          {hotel.description}
        </p>

        {/* Underline Animation */}
        <div className="pt-2">
          <div className="h-px bg-[#E5E0D8] relative overflow-hidden">
            <div
              className={cn(
                'absolute inset-y-0 left-0 bg-[#1A1A1A] transition-all duration-500',
                isHovered ? 'w-full' : 'w-0'
              )}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}
