import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import all sections
import { Hero } from '@/sections/Hero';
import { HotelsShowcase } from '@/sections/HotelsShowcase';
import { SeasonalExperiences } from '@/sections/SeasonalExperiences';
import { JourneySlider } from '@/sections/JourneySlider';
import { AmanAtSea } from '@/sections/AmanAtSea';
import { GiftEssentials } from '@/sections/GiftEssentials';
import { Newsletter } from '@/sections/Newsletter';

// Import enhanced components
import { FeaturedOffers } from '@/sections/FeaturedOffers';
import { Testimonials } from '@/sections/Testimonials';
import { QuickLinks } from '@/components/QuickLinks';
import { SEO } from '@/components/seo';

gsap.registerPlugin(ScrollTrigger);

export function HomePage() {
  useEffect(() => {
    // Refresh ScrollTrigger on mount
    ScrollTrigger.refresh();

    return () => {
      // Clean up only this page's triggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="home-page">
      <SEO
        title="Luxury Hotels & Resorts"
        description="Explore Aman luxury hotels, resorts, and residences around the world with curated journeys, wellness, and exceptional stays."
        canonical="https://aman.com/"
        url="https://aman.com/"
        image="/images/og-image.jpg"
      />
      {/* Hero Section - Full Screen */}
      <Hero />

      {/* Quick Links - New Interactive Section */}
      <QuickLinks />

      {/* Hotels & Resorts Showcase */}
      <HotelsShowcase />

      {/* Featured Offers - New Section */}
      <FeaturedOffers />

      {/* Seasonal Experiences */}
      <SeasonalExperiences />

      {/* Multi-Destination Journeys Slider */}
      <JourneySlider />

      {/* Aman at Sea */}
      <AmanAtSea />

      {/* Testimonials - New Section */}
      <Testimonials />

      {/* Gift Cards & Essentials */}
      <GiftEssentials />

      {/* Newsletter Signup */}
      <Newsletter />
    </div>
  );
}
