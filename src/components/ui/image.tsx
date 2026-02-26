import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
  onError?: () => void;
}

export function LazyImage({
  src,
  alt,
  placeholderSrc,
  className,
  containerClassName,
  aspectRatio,
  objectFit = 'cover',
  onLoad,
  onError,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-gray-100',
        aspectRatio && `aspect-[${aspectRatio}]`,
        containerClassName
      )}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Placeholder */}
      {!isLoaded && placeholderSrc && (
        <img
          src={placeholderSrc}
          alt=""
          className={cn(
            'absolute inset-0 w-full h-full transition-opacity duration-300',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'contain' && 'object-contain',
            isLoaded && 'opacity-0'
          )}
        />
      )}

      {/* Main image */}
      {isInView && !hasError && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'absolute inset-0 w-full h-full transition-opacity duration-300',
            objectFit === 'cover' && 'object-cover',
            objectFit === 'contain' && 'object-contain',
            objectFit === 'fill' && 'object-fill',
            objectFit === 'none' && 'object-none',
            objectFit === 'scale-down' && 'object-scale-down',
            !isLoaded && 'opacity-0',
            className
          )}
          {...props}
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400 text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

// Image gallery component
interface ImageGalleryProps {
  images: { src: string; alt: string }[];
  className?: string;
}

export function ImageGallery({ images, className }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <LazyImage
          src={images[selectedIndex].src}
          alt={images[selectedIndex].alt}
          className="w-full h-full"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              'flex-shrink-0 w-20 h-20 overflow-hidden border-2 transition-colors',
              selectedIndex === index
                ? 'border-[#C9A962]'
                : 'border-transparent hover:border-gray-300'
            )}
          >
            <LazyImage
              src={image.src}
              alt={image.alt}
              className="w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// Image with zoom on hover
interface ZoomImageProps extends LazyImageProps {
  zoomScale?: number;
}

export function ZoomImage({ zoomScale = 1.5, className, ...props }: ZoomImageProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setMousePosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden cursor-zoom-in', className)}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      <LazyImage
        {...props}
        className={cn(
          'transition-transform duration-200',
          isZoomed && 'scale-[var(--zoom-scale)]'
        )}
        style={{
          '--zoom-scale': zoomScale,
          transformOrigin: `${mousePosition.x * 100}% ${mousePosition.y * 100}%`,
        } as React.CSSProperties}
      />
    </div>
  );
}

// Background image with parallax effect
interface ParallaxBackgroundProps {
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxBackground({
  src,
  alt,
  children,
  className,
  speed = 0.5,
}: ParallaxBackgroundProps) {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;

      if (scrolled > 0 && rect.bottom > 0) {
        setOffset(scrolled * speed * 0.1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translateY(${offset}px) scale(1.1)`,
        }}
      >
        <LazyImage
          src={src}
          alt={alt}
          className="w-full h-full"
          objectFit="cover"
        />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Image comparison slider
interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export function ImageComparison({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className,
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, x)));
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden select-none', className)}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* After image (full width) */}
      <LazyImage
        src={afterImage}
        alt={afterLabel}
        className="w-full h-full"
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <LazyImage
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full"
        />
      </div>

      {/* Slider */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-gray-400" />
            <div className="w-0.5 h-3 bg-gray-400" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-4 left-4 px-2 py-1 bg-black/50 text-white text-sm">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 px-2 py-1 bg-black/50 text-white text-sm">
        {afterLabel}
      </span>
    </div>
  );
}
