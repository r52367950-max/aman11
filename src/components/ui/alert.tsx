import { cn } from '@/lib/utils';
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  X,
} from 'lucide-react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  className?: string;
  onClose?: () => void;
}

const variantConfig = {
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-500',
    title: 'text-blue-800',
    text: 'text-blue-700',
    Icon: Info,
  },
  success: {
    container: 'bg-green-50 border-green-200',
    icon: 'text-green-500',
    title: 'text-green-800',
    text: 'text-green-700',
    Icon: CheckCircle,
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200',
    icon: 'text-yellow-500',
    title: 'text-yellow-800',
    text: 'text-yellow-700',
    Icon: AlertTriangle,
  },
  error: {
    container: 'bg-red-50 border-red-200',
    icon: 'text-red-500',
    title: 'text-red-800',
    text: 'text-red-700',
    Icon: AlertCircle,
  },
};

export function Alert({
  children,
  variant = 'info',
  title,
  className,
  onClose,
}: AlertProps) {
  const config = variantConfig[variant];
  const Icon = config.Icon;

  return (
    <div
      className={cn(
        'relative rounded-lg border p-4',
        config.container,
        className
      )}
      role="alert"
    >
      <div className="flex gap-3">
        <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.icon)} />
        <div className="flex-1">
          {title && (
            <h3 className={cn('font-medium mb-1', config.title)}>{title}</h3>
          )}
          <div className={cn('text-sm', config.text)}>{children}</div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={cn(
              'flex-shrink-0 -mr-1 -mt-1 p-1 rounded hover:bg-black/5 transition-colors',
              config.text
            )}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// Inline alert (compact version)
interface InlineAlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
}

export function InlineAlert({
  children,
  variant = 'info',
  className,
}: InlineAlertProps) {
  const config = variantConfig[variant];
  const Icon = config.Icon;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm',
        config.container,
        config.text,
        className
      )}
    >
      <Icon className={cn('w-4 h-4', config.icon)} />
      {children}
    </div>
  );
}

// Alert with actions
interface AlertWithActionsProps extends AlertProps {
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export function AlertWithActions({
  primaryAction,
  secondaryAction,
  ...alertProps
}: AlertWithActionsProps) {
  const config = variantConfig[alertProps.variant || 'info'];

  return (
    <Alert {...alertProps}>
      <div>
        {alertProps.children}
        {(primaryAction || secondaryAction) && (
          <div className="flex gap-3 mt-3">
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded transition-colors',
                  alertProps.variant === 'error'
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-[#1A1A1A] text-white hover:bg-[#333]'
                )}
              >
                {primaryAction.label}
              </button>
            )}
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className={cn(
                  'px-3 py-1.5 text-sm font-medium rounded border transition-colors',
                  config.text,
                  alertProps.variant === 'error'
                    ? 'border-red-300 hover:bg-red-100'
                    : 'border-gray-300 hover:bg-gray-100'
                )}
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </Alert>
  );
}

// Toast alert (for notifications)
interface ToastAlertProps {
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  className?: string;
}

export function ToastAlert({
  message,
  variant = 'info',
  onClose,
  className,
}: ToastAlertProps) {
  const config = variantConfig[variant];
  const Icon = config.Icon;

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg',
        config.container,
        className
      )}
    >
      <Icon className={cn('w-5 h-5', config.icon)} />
      <span className={cn('text-sm font-medium flex-1', config.text)}>
        {message}
      </span>
      {onClose && (
        <button
          onClick={onClose}
          className={cn('p-1 rounded hover:bg-black/5 transition-colors', config.text)}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// Banner alert (full width)
interface BannerAlertProps {
  children: React.ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'error';
  className?: string;
  onClose?: () => void;
}

export function BannerAlert({
  children,
  variant = 'info',
  className,
  onClose,
}: BannerAlertProps) {
  const config = variantConfig[variant];
  const Icon = config.Icon;

  return (
    <div className={cn('w-full', config.container, className)}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          <Icon className={cn('w-5 h-5 flex-shrink-0', config.icon)} />
          <div className={cn('flex-1 text-sm', config.text)}>{children}</div>
          {onClose && (
            <button
              onClick={onClose}
              className={cn('p-1 rounded hover:bg-black/5 transition-colors', config.text)}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Form field error
interface FormErrorProps {
  message: string;
  className?: string;
}

export function FormError({ message, className }: FormErrorProps) {
  return (
    <p className={cn('text-sm text-red-600 mt-1', className)}>{message}</p>
  );
}

// Form field help text
interface FormHelpProps {
  children: React.ReactNode;
  className?: string;
}

export function FormHelp({ children, className }: FormHelpProps) {
  return (
    <p className={cn('text-sm text-gray-500 mt-1', className)}>{children}</p>
  );
}
