import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
  labelPosition?: 'inside' | 'outside';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  animated?: boolean;
  striped?: boolean;
}

export function Progress({
  value,
  max = 100,
  className,
  barClassName,
  showLabel = false,
  labelPosition = 'outside',
  size = 'md',
  variant = 'default',
  animated = false,
  striped = false,
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variantClasses = {
    default: 'bg-[#C9A962]',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  return (
    <div className={cn('w-full', className)}>
      {showLabel && labelPosition === 'outside' && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-medium text-gray-700">{Math.round(percentage)}%</span>
        </div>
      )}
      <div
        className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          sizeClasses[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            variantClasses[variant],
            animated && 'animate-progress-bar',
            striped && 'bg-stripes',
            barClassName
          )}
          style={{ width: `${percentage}%` }}
        >
          {showLabel && labelPosition === 'inside' && percentage > 15 && (
            <span className="flex items-center justify-center h-full text-xs font-medium text-white">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Circular progress
interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showLabel?: boolean;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

export function CircularProgress({
  value,
  max = 100,
  size = 64,
  strokeWidth = 4,
  className,
  showLabel = true,
  variant = 'default',
}: CircularProgressProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const variantClasses = {
    default: 'text-[#C9A962]',
    success: 'text-green-500',
    warning: 'text-yellow-500',
    error: 'text-red-500',
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-200"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn('transition-all duration-300 ease-out', variantClasses[variant])}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-sm font-medium text-gray-700">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
}

// Step progress
interface Step {
  label: string;
  description?: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
}

export function StepProgress({
  steps,
  currentStep,
  className,
  orientation = 'horizontal',
}: StepProgressProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      className={cn(
        isHorizontal ? 'flex' : 'flex-col',
        className
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const isPending = index > currentStep;

        return (
          <div
            key={index}
            className={cn(
              'flex',
              isHorizontal ? 'flex-1 flex-col items-center' : 'items-center gap-4'
            )}
          >
            {/* Step indicator */}
            <div className="flex items-center">
              <div
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                  isCompleted && 'bg-green-500 text-white',
                  isCurrent && 'bg-[#C9A962] text-white',
                  isPending && 'bg-gray-200 text-gray-500'
                )}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    isHorizontal ? 'w-full h-0.5 mx-2' : 'h-full w-0.5 ml-4 my-2',
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  )}
                />
              )}
            </div>

            {/* Step label */}
            <div
              className={cn(
                'mt-2 text-center',
                isHorizontal ? 'text-center' : 'text-left mt-0'
              )}
            >
              <p
                className={cn(
                  'text-sm font-medium',
                  isCurrent ? 'text-[#C9A962]' : 'text-gray-700'
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-gray-500 mt-0.5">{step.description}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// File upload progress
interface FileUploadProgressProps {
  fileName: string;
  progress: number;
  fileSize?: string;
  onCancel?: () => void;
  className?: string;
}

export function FileUploadProgress({
  fileName,
  progress,
  fileSize,
  onCancel,
  className,
}: FileUploadProgressProps) {
  return (
    <div className={cn('p-4 bg-gray-50 rounded-lg', className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700 truncate max-w-[200px]">
            {fileName}
          </span>
          {fileSize && <span className="text-xs text-gray-500">({fileSize})</span>}
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <Progress value={progress} size="sm" showLabel />
    </div>
  );
}

// Multi-segment progress bar
interface Segment {
  value: number;
  label: string;
  color: string;
}

interface MultiSegmentProgressProps {
  segments: Segment[];
  max?: number;
  className?: string;
  showLegend?: boolean;
}

export function MultiSegmentProgress({
  segments,
  max = 100,
  className,
  showLegend = true,
}: MultiSegmentProgressProps) {
  const total = segments.reduce((sum, seg) => sum + seg.value, 0);

  return (
    <div className={className}>
      <div className="h-4 flex rounded-full overflow-hidden">
        {segments.map((segment, index) => (
          <div
            key={index}
            className="h-full transition-all duration-300"
            style={{
              width: `${(segment.value / max) * 100}%`,
              backgroundColor: segment.color,
            }}
            title={`${segment.label}: ${segment.value}`}
          />
        ))}
      </div>
      {showLegend && (
        <div className="flex flex-wrap gap-4 mt-3">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-sm text-gray-600">
                {segment.label} ({Math.round((segment.value / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
