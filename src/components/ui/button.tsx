import React, { forwardRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export function buttonVariants({ 
  variant = 'primary', 
  size = 'md' 
}: { 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
} = {}) {
  const variantClasses = {
    primary: 'bg-[#1A1A1A] text-white hover:bg-[#333]',
    secondary: 'bg-[#C9A962] text-white hover:bg-[#B8984D]',
    outline: 'border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white',
    ghost: 'text-[#1A1A1A] hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    icon: 'p-2',
  };

  return cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size]
  );
}

export const buttonSizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  icon: 'p-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    loadingText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className,
    disabled,
    ...props
  }, ref) {
    const variantClasses = {
      primary: 'bg-[#1A1A1A] text-white hover:bg-[#333]',
      secondary: 'bg-[#C9A962] text-white hover:bg-[#B8984D]',
      outline: 'border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white',
      ghost: 'text-[#1A1A1A] hover:bg-gray-100',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    };

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
      icon: 'p-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          variantClasses[variant as keyof typeof variantClasses],
          sizeClasses[size as keyof typeof sizeClasses],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {loadingText || children}
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

// Icon button
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  className?: string;
}

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  ...props
}: IconButtonProps) {
  const variantClasses = {
    primary: 'bg-[#1A1A1A] text-white hover:bg-[#333]',
    secondary: 'bg-[#C9A962] text-white hover:bg-[#B8984D]',
    outline: 'border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white',
    ghost: 'text-[#1A1A1A] hover:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className={cn('animate-spin', iconSizeClasses[size])} />
      ) : (
        <span className={iconSizeClasses[size]}>{icon}</span>
      )}
    </button>
  );
}

// Link button
interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  external?: boolean;
}

export function LinkButton({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  fullWidth = false,
  external = false,
  className,
  ...props
}: LinkButtonProps) {
  const variantClasses = {
    primary: 'bg-[#1A1A1A] text-white hover:bg-[#333]',
    secondary: 'bg-[#C9A962] text-white hover:bg-[#B8984D]',
    outline: 'border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white',
    ghost: 'text-[#1A1A1A] hover:bg-gray-100',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:ring-offset-2',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </a>
  );
}

// Button group
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  attached?: boolean;
}

export function ButtonGroup({
  children,
  className,
  attached = true,
}: ButtonGroupProps) {
  return (
    <div
      className={cn(
        'inline-flex',
        attached && '[&>button:first-child]:rounded-r-none [&>button:last-child]:rounded-l-none [&>button:not(:first-child):not(:last-child)]:rounded-none [&>button:not(:first-child)]:-ml-px',
        className
      )}
    >
      {children}
    </div>
  );
}

// Split button
interface SplitButtonProps {
  mainAction: {
    label: string;
    onClick: () => void;
  };
  dropdownActions: Array<{
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }>;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function SplitButton({
  mainAction,
  dropdownActions,
  variant = 'primary',
  size = 'md',
  className,
}: SplitButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const variantClasses = {
    primary: 'bg-[#1A1A1A] text-white hover:bg-[#333]',
    secondary: 'bg-[#C9A962] text-white hover:bg-[#B8984D]',
    outline: 'border-2 border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <div ref={dropdownRef} className={cn('relative inline-flex', className)}>
      <button
        onClick={mainAction.onClick}
        className={cn(
          'font-medium transition-all duration-200 rounded-l-lg',
          'focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:ring-offset-2',
          variantClasses[variant],
          sizeClasses[size]
        )}
      >
        {mainAction.label}
      </button>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'px-3 border-l border-white/20 rounded-r-lg transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:ring-offset-2',
          variantClasses[variant]
        )}
      >
        <svg
          className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {dropdownActions.map((action, index) => (
            <button
              key={index}
              onClick={() => {
                action.onClick();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              {action.icon}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Floating action button
interface FABProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function FAB({
  icon,
  variant = 'primary',
  size = 'md',
  position = 'bottom-right',
  className,
  ...props
}: FABProps) {
  const variantClasses = {
    primary: 'bg-[#1A1A1A] text-white hover:bg-[#333] shadow-lg',
    secondary: 'bg-[#C9A962] text-white hover:bg-[#B8984D] shadow-lg',
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const iconSizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7',
  };

  return (
    <button
      className={cn(
        'fixed rounded-full flex items-center justify-center transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:ring-offset-2',
        'hover:scale-110 active:scale-95',
        variantClasses[variant],
        sizeClasses[size],
        positionClasses[position],
        className
      )}
      {...props}
    >
      <span className={iconSizeClasses[size]}>{icon}</span>
    </button>
  );
}
