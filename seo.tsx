import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: string;
  locale?: string;
  siteName?: string;
  twitterHandle?: string;
  noIndex?: boolean;
  canonical?: string;
  structuredData?: Record<string, unknown>;
}

export function SEO({
  title = 'Aman | Luxury Hotels & Resorts',
  description = 'Discover Aman, a collection of luxury hotels, resorts, and residences in 20 countries. Experience peace, serenity, and exceptional service.',
  keywords = ['luxury hotels', 'resorts', 'aman', 'travel', 'wellness', 'spa'],
  image = '/images/og-image.jpg',
  url = 'https://aman.com',
  type = 'website',
  locale = 'en_US',
  siteName = 'Aman',
  twitterHandle = '@aman',
  noIndex = false,
  canonical,
  structuredData,
}: SEOProps) {
  const fullTitle = title.includes('Aman') ? title : `${title} | Aman`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tag
    const updateMetaTag = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.name = name;
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords.join(', '));
    updateMetaTag('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Update Open Graph tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:locale', locale, true);
    updateMetaTag('og:site_name', siteName, true);

    // Update Twitter tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:url', url);
    updateMetaTag('twitter:title', fullTitle);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);
    if (twitterHandle) {
      updateMetaTag('twitter:site', twitterHandle);
    }

    // Update canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }

    // Add structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Meta tags are not removed on unmount as they should persist
    };
  }, [fullTitle, description, keywords, image, url, type, locale, siteName, twitterHandle, noIndex, canonical, structuredData]);

  return null;
}

// Predefined structured data templates
export const structuredDataTemplates = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aman',
    url: 'https://aman.com',
    logo: 'https://aman.com/logo.png',
    sameAs: [
      'https://www.facebook.com/aman',
      'https://www.instagram.com/aman',
      'https://twitter.com/aman',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-212-555-0100',
      contactType: 'customer service',
    },
  },
  
  hotel: (hotelName: string, address: string, image: string) => ({
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: hotelName,
    image,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
    },
    brand: {
      '@type': 'Brand',
      name: 'Aman',
    },
  }),
  
  breadcrumb: (items: { name: string; url: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }),
  
  product: (name: string, description: string, image: string, price: number) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  }),
  
  article: (title: string, description: string, image: string, date: string, author: string) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    datePublished: date,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Aman',
      logo: {
        '@type': 'ImageObject',
        url: 'https://aman.com/logo.png',
      },
    },
  }),
};

// Hook for dynamic SEO
interface UseSEOOptions {
  title?: string;
  description?: string;
  image?: string;
}

export function useSEO(options: UseSEOOptions = {}) {
  const { title, description, image } = options;

  return {
    title,
    description,
    image,
  };
}
