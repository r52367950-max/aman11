import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className,
  variant = 'text',
  animation = 'pulse',
  style,
  ...props
}: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  return (
    <div
      className={cn(
        'bg-gray-200',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      style={style}
      {...props}
    />
  );
}

// Text skeleton
interface TextSkeletonProps {
  lines?: number;
  lineHeight?: 'sm' | 'md' | 'lg';
  lastLineWidth?: 'full' | '3/4' | '1/2';
  className?: string;
}

export function TextSkeleton({
  lines = 3,
  lineHeight = 'md',
  lastLineWidth = '3/4',
  className,
}: TextSkeletonProps) {
  const heightClasses = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-5',
  };

  const widthClasses = {
    full: 'w-full',
    '3/4': 'w-3/4',
    '1/2': 'w-1/2',
  };

  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            heightClasses[lineHeight],
            i === lines - 1 && lines > 1 && widthClasses[lastLineWidth]
          )}
        />
      ))}
    </div>
  );
}

// Card skeleton
interface CardSkeletonProps {
  hasImage?: boolean;
  imageAspectRatio?: string;
  lines?: number;
  className?: string;
}

export function CardSkeleton({
  hasImage = true,
  imageAspectRatio = '16/10',
  lines = 3,
  className,
}: CardSkeletonProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {hasImage && (
        <Skeleton
          className="w-full"
          variant="rounded"
          style={{ aspectRatio: imageAspectRatio }}
        />
      )}
      <div className="space-y-2 px-1">
        <Skeleton className="h-5 w-3/4" />
        <TextSkeleton lines={lines} lineHeight="sm" />
      </div>
    </div>
  );
}

// Avatar skeleton
interface AvatarSkeletonProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function AvatarSkeleton({ size = 'md', className }: AvatarSkeletonProps) {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return <Skeleton variant="circular" className={cn(sizeClasses[size], className)} />;
}

// List skeleton
interface ListSkeletonProps {
  items?: number;
  avatarSize?: 'xs' | 'sm' | 'md' | 'lg';
  lines?: number;
  className?: string;
}

export function ListSkeleton({
  items = 5,
  avatarSize = 'md',
  lines = 2,
  className,
}: ListSkeletonProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-start gap-4">
          <AvatarSkeleton size={avatarSize} />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/3" />
            <TextSkeleton lines={lines} lineHeight="sm" />
          </div>
        </div>
      ))}
    </div>
  );
}

// Table skeleton
interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  className,
}: TableSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-6 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <Skeleton
              key={colIndex}
              className={cn('h-12 flex-1', colIndex === 0 && 'w-1/4')}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// Product card skeleton
interface ProductCardSkeletonProps {
  className?: string;
}

export function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div className={className}>
      <Skeleton className="w-full aspect-square rounded-lg" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
}

// Page skeleton
interface PageSkeletonProps {
  className?: string;
}

export function PageSkeleton({ className }: PageSkeletonProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

// Dashboard skeleton
interface DashboardSkeletonProps {
  className?: string;
}

export function DashboardSkeleton({ className }: DashboardSkeletonProps) {
  return (
    <div className={cn('space-y-8', className)}>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg space-y-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="p-4 border rounded-lg">
          <Skeleton className="h-6 w-32 mb-4" />
          <ListSkeleton items={5} avatarSize="sm" lines={1} />
        </div>
      </div>
    </div>
  );
}
