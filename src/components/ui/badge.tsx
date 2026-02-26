import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  dot?: boolean;
  dotColor?: string;
  removable?: boolean;
  onRemove?: () => void;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  dot = false,
  dotColor,
  removable = false,
  onRemove,
}: BadgeProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-[#C9A962] text-white',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-yellow-100 text-yellow-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    outline: 'bg-transparent border border-gray-300 text-gray-700',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  };

  const defaultDotColors = {
    default: 'bg-gray-400',
    primary: 'bg-white',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    outline: 'bg-gray-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full',
            dotColor || defaultDotColors[variant]
          )}
        />
      )}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-70 transition-opacity"
          type="button"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
}

// Status badge
interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'failed' | 'cancelled';
  children?: React.ReactNode;
  className?: string;
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  const statusConfig = {
    active: { variant: 'success' as const, label: 'Active' },
    inactive: { variant: 'default' as const, label: 'Inactive' },
    pending: { variant: 'warning' as const, label: 'Pending' },
    completed: { variant: 'success' as const, label: 'Completed' },
    failed: { variant: 'error' as const, label: 'Failed' },
    cancelled: { variant: 'default' as const, label: 'Cancelled' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} dot className={className}>
      {children || config.label}
    </Badge>
  );
}

// Count badge (for notifications, cart items, etc.)
interface CountBadgeProps {
  count: number;
  max?: number;
  className?: string;
  variant?: 'default' | 'primary' | 'error';
}

export function CountBadge({
  count,
  max = 99,
  className,
  variant = 'error',
}: CountBadgeProps) {
  if (count <= 0) return null;

  const displayCount = count > max ? `${max}+` : count;

  const variantClasses = {
    default: 'bg-gray-500',
    primary: 'bg-[#C9A962]',
    error: 'bg-red-500',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1',
        'text-xs font-bold text-white rounded-full',
        variantClasses[variant],
        className
      )}
    >
      {displayCount}
    </span>
  );
}

// Tag badge (for categories, labels)
interface TagBadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export function TagBadge({ children, color, className, onClick }: TagBadgeProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm',
        'bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors',
        onClick && 'cursor-pointer',
        className
      )}
      style={color ? { backgroundColor: `${color}20`, color } : undefined}
    >
      {children}
    </span>
  );
}

// New badge
interface NewBadgeProps {
  className?: string;
}

export function NewBadge({ className }: NewBadgeProps) {
  return (
    <Badge variant="primary" size="sm" className={className}>
      NEW
    </Badge>
  );
}

// Featured badge
interface FeaturedBadgeProps {
  className?: string;
}

export function FeaturedBadge({ className }: FeaturedBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 bg-[#C9A962] text-white text-xs font-medium',
        className
      )}
    >
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      Featured
    </span>
  );
}

// Discount badge
interface DiscountBadgeProps {
  discount: number;
  className?: string;
}

export function DiscountBadge({ discount, className }: DiscountBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-1 bg-red-500 text-white text-xs font-bold',
        className
      )}
    >
      -{discount}%
    </span>
  );
}

// Verified badge
interface VerifiedBadgeProps {
  className?: string;
}

export function VerifiedBadge({ className }: VerifiedBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full',
        className
      )}
      title="Verified"
    >
      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

// Premium badge
interface PremiumBadgeProps {
  className?: string;
}

export function PremiumBadge({ className }: PremiumBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold',
        className
      )}
    >
      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
      </svg>
      PREMIUM
    </span>
  );
}

// Badge group
interface BadgeGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function BadgeGroup({ children, className }: BadgeGroupProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {children}
    </div>
  );
}
