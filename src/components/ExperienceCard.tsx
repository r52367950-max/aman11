import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  variant?: 'default' | 'large';
}

export function ExperienceCard({
  experience,
  index,
  variant = 'default',
}: ExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === 'large') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.8,
          delay: index * 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="group cursor-pointer relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={experience.image}
            alt={experience.title}
            className={cn(
              'w-full h-full object-cover transition-transform duration-700',
              isHovered ? 'scale-105' : 'scale-100'
            )}
            loading="lazy"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <p className="caption-uppercase text-white/70 mb-2">
              {experience.category}
            </p>
            <h3 className="text-2xl md:text-3xl font-serif font-light text-white">
              {experience.title}
            </h3>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#E5E0D8]">
        <img
          src={experience.image}
          alt={experience.title}
          className={cn(
            'w-full h-full object-cover transition-transform duration-700',
            isHovered ? 'scale-105' : 'scale-100'
          )}
          loading="lazy"
        />

        {/* Overlay */}
        <div
          className={cn(
            'absolute inset-0 bg-black/30 transition-opacity duration-500',
            isHovered ? 'opacity-100' : 'opacity-0'
          )}
        />
      </div>

      <div className="pt-4 space-y-1">
        <p className="caption-uppercase text-[#9A9A9A]">{experience.category}</p>
        <h4 className="text-xl font-serif font-light text-[#1A1A1A] group-hover:text-[#C9A962] transition-colors duration-300">
          {experience.title}
        </h4>
      </div>
    </motion.article>
  );
}
