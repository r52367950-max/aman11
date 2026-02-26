import { cn } from '@/lib/utils';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  label?: string;
  description?: string;
}

export function Switch({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  className,
  label,
  description,
}: SwitchProps) {
  const sizeClasses = {
    sm: 'w-9 h-5',
    md: 'w-11 h-6',
    lg: 'w-14 h-8',
  };

  const thumbSizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-6 h-6',
  };

  const thumbPositionClasses = {
    sm: checked ? 'translate-x-4.5' : 'translate-x-0.5',
    md: checked ? 'translate-x-6' : 'translate-x-1',
    lg: checked ? 'translate-x-7' : 'translate-x-1',
  };

  return (
    <label
      className={cn(
        'flex items-center gap-3 cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:ring-offset-2',
          sizeClasses[size],
          checked ? 'bg-[#C9A962]' : 'bg-gray-200',
          disabled && 'cursor-not-allowed'
        )}
      >
        <span
          className={cn(
            'inline-block bg-white rounded-full transition-transform duration-200 ease-in-out',
            thumbSizeClasses[size],
            thumbPositionClasses[size]
          )}
        />
      </button>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-gray-900">{label}</span>
          )}
          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
        </div>
      )}
    </label>
  );
}

// Toggle group
interface ToggleGroupProps {
  options: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ToggleGroup({
  options,
  value,
  onChange,
  className,
}: ToggleGroupProps) {
  return (
    <div className={cn('flex p-1 bg-gray-100 rounded-lg', className)}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors',
            value === option.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}

// Segmented control
interface SegmentedControlProps {
  options: Array<{
    value: string;
    label: string;
  }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  return (
    <div className={cn('inline-flex border border-gray-300 rounded-lg overflow-hidden', className)}>
      {options.map((option, index) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'px-4 py-2 text-sm font-medium transition-colors',
            value === option.value
              ? 'bg-[#1A1A1A] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50',
            index > 0 && 'border-l border-gray-300'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

// Checkbox
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string;
  description?: string;
}

export function Checkbox({
  checked,
  onChange,
  disabled = false,
  className,
  label,
  description,
}: CheckboxProps) {
  return (
    <label
      className={cn(
        'flex items-start gap-3 cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div className="relative flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="peer sr-only"
        />
        <div
          className={cn(
            'w-5 h-5 border-2 rounded transition-all',
            checked
              ? 'bg-[#C9A962] border-[#C9A962]'
              : 'bg-white border-gray-300 peer-hover:border-gray-400'
          )}
        >
          {checked && (
            <svg
              className="w-full h-full text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </div>
      {(label || description) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-gray-900">{label}</span>
          )}
          {description && (
            <span className="text-xs text-gray-500">{description}</span>
          )}
        </div>
      )}
    </label>
  );
}

// Radio group
interface RadioGroupProps {
  options: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function RadioGroup({
  options,
  value,
  onChange,
  className,
}: RadioGroupProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {options.map((option) => (
        <label
          key={option.value}
          className="flex items-start gap-3 cursor-pointer"
        >
          <div className="relative flex items-center mt-0.5">
            <input
              type="radio"
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="peer sr-only"
            />
            <div
              className={cn(
                'w-5 h-5 border-2 rounded-full transition-all',
                value === option.value
                  ? 'border-[#C9A962]'
                  : 'border-gray-300 peer-hover:border-gray-400'
              )}
            >
              {value === option.value && (
                <div className="absolute inset-1 bg-[#C9A962] rounded-full" />
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{option.label}</span>
            {option.description && (
              <span className="text-xs text-gray-500">{option.description}</span>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

// Color picker
interface ColorPickerProps {
  colors: string[];
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPicker({
  colors,
  value,
  onChange,
  className,
}: ColorPickerProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onChange(color)}
          className={cn(
            'w-8 h-8 rounded-full border-2 transition-all',
            value === color
              ? 'border-gray-900 scale-110'
              : 'border-transparent hover:scale-105'
          )}
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  );
}

// Size selector
interface SizeSelectorProps {
  sizes: string[];
  value: string;
  onChange: (size: string) => void;
  className?: string;
}

export function SizeSelector({
  sizes,
  value,
  onChange,
  className,
}: SizeSelectorProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={cn(
            'min-w-[40px] px-3 py-2 text-sm font-medium border-2 transition-all',
            value === size
              ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
              : 'border-gray-200 hover:border-gray-300'
          )}
        >
          {size}
        </button>
      ))}
    </div>
  );
}
