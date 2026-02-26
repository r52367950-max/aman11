import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
  className?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ error, errorInfo });

    // You could also log to an error reporting service here
    // logErrorToService(error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    this.props.onReset?.();
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
          onReload={this.handleReload}
          onGoHome={this.handleGoHome}
          className={this.props.className}
        />
      );
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  onReset?: () => void;
  onReload?: () => void;
  onGoHome?: () => void;
  className?: string;
}

export function ErrorFallback({
  error,
  errorInfo,
  onReset,
  onReload,
  onGoHome,
  className,
}: ErrorFallbackProps) {
  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <div
      className={cn(
        'min-h-[400px] flex flex-col items-center justify-center p-8',
        className
      )}
    >
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-10 h-10 text-red-600" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-2">
        Something went wrong
      </h2>

      <p className="text-gray-600 text-center max-w-md mb-8">
        We apologize for the inconvenience. An unexpected error has occurred.
        Please try again or contact support if the problem persists.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        {onReset && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}

        {onReload && (
          <button
            onClick={onReload}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Page
          </button>
        )}

        {onGoHome && (
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        )}
      </div>

      {import.meta.env.DEV && error && (
        <div className="mt-8 w-full max-w-2xl">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            {showDetails ? 'Hide' : 'Show'} Error Details
          </button>

          {showDetails && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left overflow-auto">
              <p className="text-red-600 font-mono text-sm mb-2">
                <strong>Error:</strong> {error.toString()}
              </p>
              {errorInfo && (
                <pre className="text-xs text-gray-600 overflow-auto">
                  {errorInfo.componentStack}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Hook for async error handling
export function useAsyncError() {
  const [, setError] = React.useState<Error | null>(null);

  return React.useCallback(
    (e: Error) => {
      setError(() => {
        throw e;
      });
    },
    [setError]
  );
}

// Component for handling errors in async operations
interface AsyncErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error) => void;
}

export function AsyncErrorBoundary({ children, onError }: AsyncErrorBoundaryProps) {
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  if (error) {
    return (
      <ErrorFallback
        error={error}
        errorInfo={null}
        onReset={() => setError(null)}
      />
    );
  }

  return <>{children}</>;
}
