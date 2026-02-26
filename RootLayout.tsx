import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/sections/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

export function RootLayout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
