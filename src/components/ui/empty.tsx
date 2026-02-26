import React, { type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Search, Package, Inbox, FileQuestion, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: 'search' | 'package' | 'inbox' | 'file' | 'alert' | ReactNode;
  action?: ReactNode;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  search: Search,
  package: Package,
  inbox: Inbox,
  file: FileQuestion,
  alert: AlertCircle,
};

export function EmptyState({
  title = 'No results found',
  description = 'Try adjusting your search or filters.',
  icon = 'inbox',
  action,
  className,
}: EmptyStateProps) {
  const IconComponent = typeof icon === 'string' ? iconMap[icon] : null;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        {IconComponent ? (
          <IconComponent className="w-8 h-8 text-gray-400" />
        ) : (
          icon
        )}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

interface EmptySearchProps {
  query?: string;
  onClear?: () => void;
  className?: string;
}

export function EmptySearch({ query, onClear, className }: EmptySearchProps) {
  return (
    <EmptyState
      title={query ? `No results for "${query}"` : 'No results found'}
      description="Try adjusting your search terms or browse our categories."
      icon="search"
      className={className}
      action={
        onClear && (
          <button
            onClick={onClear}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors"
          >
            Clear Search
          </button>
        )
      }
    />
  );
}

interface EmptyCartProps {
  onContinueShopping?: () => void;
  className?: string;
}

export function EmptyCart({ onContinueShopping, className }: EmptyCartProps) {
  return (
    <EmptyState
      title="Your cart is empty"
      description="Looks like you haven't added anything to your cart yet."
      icon="package"
      className={className}
      action={
        onContinueShopping && (
          <button
            onClick={onContinueShopping}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </button>
        )
      }
    />
  );
}

interface EmptyWishlistProps {
  onBrowseProducts?: () => void;
  className?: string;
}

export function EmptyWishlist({ onBrowseProducts, className }: EmptyWishlistProps) {
  return (
    <EmptyState
      title="Your wishlist is empty"
      description="Save items you love to your wishlist and find them easily later."
      icon="inbox"
      className={className}
      action={
        onBrowseProducts && (
          <button
            onClick={onBrowseProducts}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors"
          >
            Browse Products
          </button>
        )
      }
    />
  );
}

interface EmptyOrdersProps {
  onStartShopping?: () => void;
  className?: string;
}

export function EmptyOrders({ onStartShopping, className }: EmptyOrdersProps) {
  return (
    <EmptyState
      title="No orders yet"
      description="You haven't placed any orders yet. Start shopping to see your orders here."
      icon="package"
      className={className}
      action={
        onStartShopping && (
          <button
            onClick={onStartShopping}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors"
          >
            Start Shopping
          </button>
        )
      }
    />
  );
}

interface EmptyNotificationsProps {
  className?: string;
}

export function EmptyNotifications({ className }: EmptyNotificationsProps) {
  return (
    <EmptyState
      title="No notifications"
      description="You're all caught up! Check back later for updates."
      icon="inbox"
      className={className}
    />
  );
}

interface EmptyErrorProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function EmptyError({
  title = 'Something went wrong',
  description = 'We encountered an error while loading this content. Please try again.',
  onRetry,
  className,
}: EmptyErrorProps) {
  return (
    <EmptyState
      title={title}
      description={description}
      icon="alert"
      className={className}
      action={
        onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        )
      }
    />
  );
}
