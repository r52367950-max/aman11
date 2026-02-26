import { createHashRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';

// Hotel Pages
import { HotelsListPage } from '@/pages/hotels/HotelsListPage';
import { HotelDetailPage } from '@/pages/hotels/HotelDetailPage';

// Experience Pages
import { ExperiencesListPage } from '@/pages/experiences/ExperiencesListPage';
import { ExperienceDetailPage } from '@/pages/experiences/ExperienceDetailPage';

// Booking Pages
import { BookingPage } from '@/pages/booking/BookingPage';
import { BookingConfirmationPage } from '@/pages/booking/BookingConfirmationPage';

// About Pages
import { AboutPage } from '@/pages/about/AboutPage';
import { OurStoryPage } from '@/pages/about/OurStoryPage';
import { SustainabilityPage } from '@/pages/about/SustainabilityPage';
import { CareersPage } from '@/pages/about/CareersPage';

// Service Pages
import { SpaPage } from '@/pages/services/SpaPage';
import { DiningPage } from '@/pages/services/DiningPage';
import { WellnessPage } from '@/pages/services/WellnessPage';
import { ConciergePage } from '@/pages/services/ConciergePage';
import { WeddingsPage } from '@/pages/services/WeddingsPage';
import { EventsPage } from '@/pages/services/EventsPage';

// Shop Pages
import { ShopPage } from '@/pages/shop/ShopPage';
import { ProductDetailPage } from '@/pages/shop/ProductDetailPage';
import { CartPage } from '@/pages/shop/CartPage';
import { CheckoutPage } from '@/pages/shop/CheckoutPage';
import { GiftCardsPage } from '@/pages/shop/GiftCardsPage';

// Legal Pages
import { ContactPage } from '@/pages/legal/ContactPage';
import { PrivacyPage } from '@/pages/legal/PrivacyPage';
import { TermsPage } from '@/pages/legal/TermsPage';
import { CookiePolicyPage } from '@/pages/legal/CookiePolicyPage';
import { AccessibilityPage } from '@/pages/legal/AccessibilityPage';
import { FaqPage } from '@/pages/legal/FaqPage';

// Additional Pages
import { AmanAtSeaPage } from '@/pages/AmanAtSeaPage';
import { JournalPage } from '@/pages/JournalPage';
import { JournalArticlePage } from '@/pages/JournalArticlePage';
import { MembershipPage } from '@/pages/MembershipPage';
import { PressPage } from '@/pages/PressPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // Home
      { index: true, element: <HomePage /> },

      // Hotels
      { path: 'hotels', element: <HotelsListPage /> },
      { path: 'hotels/:slug', element: <HotelDetailPage /> },

      // Experiences
      { path: 'experiences', element: <ExperiencesListPage /> },
      { path: 'experiences/:slug', element: <ExperienceDetailPage /> },

      // Booking
      { path: 'book', element: <BookingPage /> },
      { path: 'book/confirmation', element: <BookingConfirmationPage /> },

      // About
      { path: 'about', element: <AboutPage /> },
      { path: 'about/our-story', element: <OurStoryPage /> },
      { path: 'about/sustainability', element: <SustainabilityPage /> },
      { path: 'about/careers', element: <CareersPage /> },

      // Services
      { path: 'spa', element: <SpaPage /> },
      { path: 'dining', element: <DiningPage /> },
      { path: 'wellness', element: <WellnessPage /> },
      { path: 'concierge', element: <ConciergePage /> },
      { path: 'weddings', element: <WeddingsPage /> },
      { path: 'events', element: <EventsPage /> },

      // Shop
      { path: 'shop', element: <ShopPage /> },
      { path: 'shop/product/:slug', element: <ProductDetailPage /> },
      { path: 'shop/cart', element: <CartPage /> },
      { path: 'shop/checkout', element: <CheckoutPage /> },
      { path: 'gift-cards', element: <GiftCardsPage /> },

      // Aman at Sea
      { path: 'aman-at-sea', element: <AmanAtSeaPage /> },

      // Journal
      { path: 'journal', element: <JournalPage /> },
      { path: 'journal/:slug', element: <JournalArticlePage /> },

      // Membership
      { path: 'membership', element: <MembershipPage /> },

      // Press
      { path: 'press', element: <PressPage /> },

      // Legal & Support
      { path: 'contact', element: <ContactPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'cookies', element: <CookiePolicyPage /> },
      { path: 'accessibility', element: <AccessibilityPage /> },

      // 404
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
