import { cn } from '@/lib/utils';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Loading({ size = 'md', className }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  return (
    <div
      className={cn(
        'inline-block rounded-full border-current border-t-transparent animate-spin',
        sizeClasses[size],
        className
      )}
    />
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export function LoadingOverlay({ isLoading, children, className }: LoadingOverlayProps) {
  return (
    <div className={cn('relative', className)}>
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Loading size="lg" />
        </div>
      )}
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className, variant = 'text' }: SkeletonProps) {
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200',
        variantClasses[variant],
        className
      )}
    />
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 && lines > 1 && 'w-3/4'
          )}
        />
      ))}
    </div>
  );
}

interface SkeletonCardProps {
  hasImage?: boolean;
  className?: string;
}

export function SkeletonCard({ hasImage = true, className }: SkeletonCardProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {hasImage && <Skeleton className="w-full aspect-video" variant="rectangular" />}
      <SkeletonText lines={3} />
    </div>
  );
}

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingDots({ size = 'md', className }: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span
        className={cn(
          'bg-current rounded-full animate-bounce',
          sizeClasses[size]
        )}
        style={{ animationDelay: '0ms' }}
      />
      <span
        className={cn(
          'bg-current rounded-full animate-bounce',
          sizeClasses[size]
        )}
        style={{ animationDelay: '150ms' }}
      />
      <span
        className={cn(
          'bg-current rounded-full animate-bounce',
          sizeClasses[size]
        )}
        style={{ animationDelay: '300ms' }}
      />
    </div>
  );
}

interface LoadingBarProps {
  progress?: number;
  indeterminate?: boolean;
  className?: string;
}

export function LoadingBar({ progress, indeterminate = false, className }: LoadingBarProps) {
  return (
    <div className={cn('w-full h-1 bg-gray-200 overflow-hidden', className)}>
      {indeterminate ? (
        <div className="h-full bg-current animate-loading-bar" />
      ) : (
        <div
          className="h-full bg-current transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      )}
    </div>
  );
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <Loading size={size} />
      {text && <span className="text-sm text-gray-500">{text}</span>}
    </div>
  );
}
