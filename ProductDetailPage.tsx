import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { ArrowLeft, Star, Check, ShoppingBag, Heart, Share2, Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getProductBySlug } from '@/data/shop';

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F0E8] pt-32 text-center">
        <h1 className="text-3xl font-serif text-[#1A1A1A]">Product not found</h1>
        <Link to="/shop" className="text-[#C9A962] mt-4 inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8] pt-20">
      {/* Breadcrumb */}
      <div className="container-aman py-6">
        <Link to="/shop" className="flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Shop</span>
        </Link>
      </div>

      {/* Product */}
      <div className="container-aman py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white border border-[#E5E0D8]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.gallery.map((img, idx) => (
                <div key={idx} className="aspect-square bg-white border border-[#E5E0D8]">
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-sm text-[#9A9A9A] mb-2">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-4 h-4',
                      i < Math.floor(product.rating)
                        ? 'fill-[#C9A962] text-[#C9A962]'
                        : 'text-[#E5E0D8]'
                    )}
                  />
                ))}
              </div>
              <span className="text-sm text-[#6B6B6B]">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <p className="text-2xl text-[#C9A962] font-medium mb-6">
              ${product.price} {product.currency}
            </p>

            {/* Description */}
            <p className="text-[#6B6B6B] mb-6">{product.description}</p>

            {/* Size Selection */}
            {product.sizes && (
              <div className="mb-6">
                <label className="text-sm text-[#6B6B6B] mb-2 block">Size</label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        'px-4 py-2 border transition-colors',
                        selectedSize === size
                          ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                          : 'bg-white text-[#1A1A1A] border-[#E5E0D8] hover:border-[#1A1A1A]'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm text-[#6B6B6B] mb-2 block">Quantity</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-[#E5E0D8] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-[#E5E0D8] flex items-center justify-center hover:border-[#1A1A1A] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className={cn(
                  'flex-1 py-4 flex items-center justify-center gap-2 transition-colors',
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-[#1A1A1A] text-white hover:bg-[#333]'
                )}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={cn(
                  'w-14 h-14 border flex items-center justify-center transition-colors',
                  isLiked
                    ? 'border-red-500 bg-red-500 text-white'
                    : 'border-[#E5E0D8] hover:border-[#1A1A1A]'
                )}
              >
                <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
              </button>
              <button className="w-14 h-14 border border-[#E5E0D8] flex items-center justify-center hover:border-[#1A1A1A] transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Benefits */}
            {product.benefits && (
              <div className="border-t border-[#E5E0D8] pt-6 mb-6">
                <h3 className="text-lg font-serif text-[#1A1A1A] mb-3">Benefits</h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[#6B6B6B]">
                      <Check className="w-4 h-4 text-[#C9A962] mt-0.5" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && (
              <div className="border-t border-[#E5E0D8] pt-6">
                <h3 className="text-lg font-serif text-[#1A1A1A] mb-3">Key Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ingredient, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[#F5F0E8] text-sm text-[#6B6B6B]">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
