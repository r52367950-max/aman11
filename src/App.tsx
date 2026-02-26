import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Components
import { Header } from '@/components/Header';

// Sections
import { Hero } from '@/sections/Hero';
import { HotelsShowcase } from '@/sections/HotelsShowcase';
import { SeasonalExperiences } from '@/sections/SeasonalExperiences';
import { JourneySlider } from '@/sections/JourneySlider';
import { AmanAtSea } from '@/sections/AmanAtSea';
import { GiftEssentials } from '@/sections/GiftEssentials';
import { Newsletter } from '@/sections/Newsletter';
import { Footer } from '@/sections/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Handle resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      // Clean up all ScrollTriggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section - Full Screen */}
        <Hero />

        {/* Hotels & Resorts Showcase */}
        <HotelsShowcase />

        {/* Seasonal Experiences */}
        <SeasonalExperiences />

        {/* Multi-Destination Journeys Slider */}
        <JourneySlider />

        {/* Aman at Sea */}
        <AmanAtSea />

        {/* Gift Cards & Essentials */}
        <GiftEssentials />

        {/* Newsletter Signup */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
