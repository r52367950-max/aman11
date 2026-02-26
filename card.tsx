import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  clickable?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  hover = false,
  clickable = false,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-lg border border-gray-200 overflow-hidden',
        hover && 'hover:shadow-lg transition-shadow',
        (clickable || onClick) && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

// Card Header
interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('px-6 py-4 border-b border-gray-100', className)}>
      {children}
    </div>
  );
}

// Card Title
interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={cn('text-lg font-semibold text-gray-900', className)}>
      {children}
    </h3>
  );
}

// Card Description
interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return (
    <p className={cn('text-sm text-gray-500 mt-1', className)}>
      {children}
    </p>
  );
}

// Card Content
interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>;
}

// Card Footer
interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-gray-100 flex items-center gap-3',
        className
      )}
    >
      {children}
    </div>
  );
}

// Image Card
interface ImageCardProps {
  image: string;
  title: string;
  description?: string;
  badge?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  aspectRatio?: string;
  onClick?: () => void;
}

export function ImageCard({
  image,
  title,
  description,
  badge,
  footer,
  className,
  aspectRatio = '16/10',
  onClick,
}: ImageCardProps) {
  return (
    <Card className={className} hover onClick={onClick}>
      <div className="relative overflow-hidden" style={{ aspectRatio }}>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {badge && (
          <div className="absolute top-3 left-3">{badge}</div>
        )}
      </div>
      <CardContent>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}

// Product Card
interface ProductCardProps {
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ProductCard({
  image,
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  badge,
  onClick,
  className,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <Card className={className} hover onClick={onClick}>
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {badge && <div className="absolute top-3 left-3">{badge}</div>}
        {discount && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold">
            -{discount}%
          </div>
        )}
      </div>
      <CardContent>
        <h3 className="font-medium text-gray-900 line-clamp-2">{name}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-[#C9A962]">${price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${originalPrice}
            </span>
          )}
        </div>
        {rating !== undefined && (
          <div className="flex items-center gap-1 mt-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={cn(
                    'w-4 h-4',
                    i < Math.floor(rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  )}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {reviewCount !== undefined && (
              <span className="text-xs text-gray-500">({reviewCount})</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Testimonial Card
interface TestimonialCardProps {
  quote: string;
  author: {
    name: string;
    title?: string;
    avatar?: string;
  };
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  rating,
  className,
}: TestimonialCardProps) {
  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="flex flex-col h-full">
        {rating && (
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={cn(
                  'w-4 h-4',
                  i < rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                )}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        )}
        <blockquote className="flex-1 text-gray-700 italic">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {author.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{author.name}</p>
            {author.title && (
              <p className="text-sm text-gray-500">{author.title}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Stat Card
interface StatCardProps {
  label: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  change,
  icon,
  className,
}: StatCardProps) {
  return (
    <Card className={className}>
      <CardContent>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {change && (
              <div className="flex items-center gap-1 mt-2">
                <span
                  className={cn(
                    'text-sm font-medium',
                    change.isPositive ? 'text-green-600' : 'text-red-600'
                  )}
                >
                  {change.isPositive ? '+' : ''}
                  {change.value}%
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Feature Card
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <Card className={cn('h-full', className)} hover>
      <CardContent className="flex flex-col h-full">
        <div className="w-12 h-12 bg-[#C9A962]/10 rounded-lg flex items-center justify-center text-[#C9A962] mb-4">
          {icon}
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 flex-1">{description}</p>
      </CardContent>
    </Card>
  );
}
