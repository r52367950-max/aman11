import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAllProducts, shopCategories } from '@/data/shop';

gsap.registerPlugin(ScrollTrigger);

export function ShopPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const products = getAllProducts();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
  }, [filteredProducts]);

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src="/images/misc/aman-essentials.jpg"
          alt="Aman Shop"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <p className="caption-uppercase text-white/70 mb-4">The Official Shop</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light">
              Aman Essentials
            </h1>
            <p className="mt-6 text-white/80 max-w-xl mx-auto">
              Discover our collection of skincare, fragrance, and homeware
            </p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div ref={sectionRef} className="container-aman py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {shopCategories.map((category, index) => (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCategory(category.name)}
              className={cn(
                'relative aspect-square overflow-hidden group',
                selectedCategory === category.name && 'ring-2 ring-[#C9A962]'
              )}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-xl font-serif">{category.name}</h3>
                <p className="text-sm text-white/70">{category.productCount} products</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9A9A9A]" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-[#E5E0D8] focus:outline-none focus:border-[#1A1A1A]"
            />
          </div>
          <button
            onClick={() => setSelectedCategory('All')}
            className={cn(
              'px-6 py-3 border transition-colors',
              selectedCategory === 'All'
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                : 'bg-white text-[#1A1A1A] border-[#E5E0D8] hover:border-[#1A1A1A]'
            )}
          >
            All Products
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/shop/product/${product.slug}`}
              className="animate-in opacity-0 group"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-[#E5E0D8] overflow-hidden hover:border-[#C9A962] transition-all"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-[#F5F0E8]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-xs text-[#9A9A9A] mb-1">{product.category}</p>
                  <h3 className="text-lg font-serif text-[#1A1A1A] group-hover:text-[#C9A962] transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'w-3 h-3',
                          i < Math.floor(product.rating)
                            ? 'fill-[#C9A962] text-[#C9A962]'
                            : 'text-[#E5E0D8]'
                        )}
                      />
                    ))}
                    <span className="text-xs text-[#9A9A9A] ml-1">
                      ({product.reviewCount})
                    </span>
                  </div>
                  <p className="text-[#C9A962] font-medium mt-3">
                    ${product.price} {product.currency}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#6B6B6B]">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Gift Cards CTA */}
      <div className="bg-[#1A1A1A] text-white py-16">
        <div className="container-aman">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif mb-2">
                Aman Gift Cards
              </h3>
              <p className="text-white/70">
                The perfect gift for loved ones - redeemable at any Aman property
              </p>
            </div>
            <Link
              to="/gift-cards"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A962] text-white hover:bg-[#B8984D] transition-colors"
            >
              Shop Gift Cards
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
