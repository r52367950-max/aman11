import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function OurStoryPage() {
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
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src="/images/hotels/amangiri.jpg"
          alt="Aman Story"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="caption-uppercase text-white/70 mb-4">Our Heritage</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light">
              Our Story
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div ref={sectionRef} className="container-aman py-20">
        <div className="max-w-4xl mx-auto">
          {/* Founder Quote */}
          <div className="animate-in opacity-0 bg-[#1A1A1A] text-white p-8 md:p-12 mb-16">
            <Quote className="w-12 h-12 text-[#C9A962] mb-6" />
            <blockquote className="text-2xl md:text-3xl font-serif font-light leading-relaxed mb-6">
              "I wanted to create a place where people could find peace, where the boundaries 
              between inside and outside blur, where nature and architecture become one."
            </blockquote>
            <div>
              <p className="text-white font-medium">Adrian Zecha</p>
              <p className="text-white/60 text-sm">Founder, Aman</p>
            </div>
          </div>

          {/* Story Sections */}
          <div className="space-y-16">
            <section className="animate-in opacity-0">
              <h2 className="text-3xl font-serif text-[#1A1A1A] mb-6">The Beginning</h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-4">
                In 1988, Adrian Zecha discovered a coconut plantation on Phuket's west coast. 
                Inspired by the serene beauty of the location, he envisioned a place that would 
                offer travelers something truly different - not just luxury accommodation, but 
                a sanctuary where they could disconnect from the world and reconnect with themselves.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed">
                Amanpuri, meaning "place of peace," opened its doors that same year. With just 
                40 pavilions set among coconut palms overlooking the Andaman Sea, it introduced 
                a new concept in hospitality - one that prioritized space, privacy, and a deep 
                connection to the natural environment.
              </p>
            </section>

            <section className="animate-in opacity-0">
              <h2 className="text-3xl font-serif text-[#1A1A1A] mb-6">The Aman Philosophy</h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-4">
                From the beginning, Aman was guided by a simple philosophy: to provide guests 
                with the time, space, and serenity to appreciate the beauty of their surroundings. 
                This meant creating properties that were not just in extraordinary locations, but 
                that truly belonged to them.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed">
                Each Aman resort is designed to reflect its destination - the architecture, 
                materials, and even the staff uniforms are carefully chosen to honor local 
                traditions and culture. The result is a collection of properties that feel 
                authentic, timeless, and deeply connected to their environment.
              </p>
            </section>

            <section className="animate-in opacity-0">
              <h2 className="text-3xl font-serif text-[#1A1A1A] mb-6">Growing the Family</h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-4">
                Over the next three decades, Aman expanded across the globe. From the pristine 
                beaches of the Philippines to the dramatic deserts of Utah, from the ancient 
                temples of Cambodia to the bustling metropolis of Tokyo, each new property 
                brought its own unique character while staying true to the Aman philosophy.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed">
                Today, Aman encompasses 35+ properties in 20 countries, including resorts, 
                hotels, residences, and soon, a luxury yacht. Yet despite this growth, the 
                core values remain unchanged - a commitment to peace, harmony, and excellence 
                in everything we do.
              </p>
            </section>

            <section className="animate-in opacity-0">
              <h2 className="text-3xl font-serif text-[#1A1A1A] mb-6">Looking Forward</h2>
              <p className="text-[#6B6B6B] leading-relaxed mb-4">
                As we look to the future, Aman continues to evolve. The launch of Aman at Sea 
                represents a new chapter in our story, bringing the Aman experience to the open 
                waters. New properties are in development in exciting destinations, each one 
                offering a fresh perspective on what an Aman sanctuary can be.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed">
                Yet through all this change, our commitment to our guests remains constant. 
                We will continue to create spaces of peace and beauty, where the world's most 
                discerning travelers can find the serenity they seek.
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-aman text-center">
          <h3 className="text-2xl md:text-3xl font-serif mb-4">
            Experience Aman for Yourself
          </h3>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Discover why Aman has been the choice of discerning travelers for over three decades.
          </p>
          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A962] text-white hover:bg-[#B8984D] transition-colors"
          >
            Explore Our Destinations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
