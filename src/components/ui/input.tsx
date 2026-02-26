import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Search, Calendar, Lock } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn(fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'block w-full rounded-lg border border-gray-300 px-4 py-2.5',
              'text-gray-900 placeholder:text-gray-400',
              'focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962] focus:outline-none',
              'transition-colors duration-200',
              'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            disabled={disabled}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Password input
interface PasswordInputProps extends Omit<InputProps, 'type' | 'rightIcon'> {
  showStrength?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showStrength, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = React.useState('');

    const togglePassword = () => setShowPassword(!showPassword);

    const getStrength = (pwd: string): { score: number; label: string } => {
      let score = 0;
      if (pwd.length >= 8) score++;
      if (/[A-Z]/.test(pwd)) score++;
      if (/[0-9]/.test(pwd)) score++;
      if (/[^A-Za-z0-9]/.test(pwd)) score++;

      const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
      return { score, label: labels[score] };
    };

    const strength = showStrength ? getStrength(password) : null;

    return (
      <div>
        <Input
          ref={ref}
          type={showPassword ? 'text' : 'password'}
          rightIcon={
            <button
              type="button"
              onClick={togglePassword}
              className="hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          }
          leftIcon={<Lock className="w-5 h-5" />}
          onChange={(e) => {
            setPassword(e.target.value);
            props.onChange?.(e);
          }}
          {...props}
        />
        {showStrength && password && (
          <div className="mt-2">
            <div className="flex gap-1 h-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'flex-1 rounded-full transition-colors',
                    i < (strength?.score || 0)
                      ? strength?.score === 4
                        ? 'bg-green-500'
                        : strength?.score === 3
                        ? 'bg-blue-500'
                        : strength?.score === 2
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                      : 'bg-gray-200'
                  )}
                />
              ))}
            </div>
            <p className="mt-1 text-xs text-gray-500">{strength?.label}</p>
          </div>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

// Search input
interface SearchInputProps extends Omit<InputProps, 'leftIcon' | 'type'> {
  onSearch?: (value: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        onSearch?.(e.currentTarget.value);
      }
    };

    return (
      <Input
        ref={ref}
        type="search"
        leftIcon={<Search className="w-5 h-5" />}
        placeholder="Search..."
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);

SearchInput.displayName = 'SearchInput';

// Date input
interface DateInputProps extends Omit<InputProps, 'type' | 'leftIcon'> {}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (props, ref) => {
    return (
      <Input
        ref={ref}
        type="date"
        leftIcon={<Calendar className="w-5 h-5" />}
        {...props}
      />
    );
  }
);

DateInput.displayName = 'DateInput';

// Textarea
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { label, error, helperText, fullWidth = false, resize = 'vertical', className, ...props },
    ref
  ) => {
    const resizeClasses = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    return (
      <div className={cn(fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'block w-full rounded-lg border border-gray-300 px-4 py-2.5',
            'text-gray-900 placeholder:text-gray-400',
            'focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962] focus:outline-none',
            'transition-colors duration-200',
            'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
            resizeClasses[resize],
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

// Select
interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'options'> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, helperText, options, placeholder, fullWidth = false, className, ...props },
    ref
  ) => {
    return (
      <div className={cn(fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              'block w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-10',
              'text-gray-900 bg-white',
              'focus:border-[#C9A962] focus:ring-1 focus:ring-[#C9A962] focus:outline-none',
              'transition-colors duration-200',
              'disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed',
              'appearance-none',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

// File input
interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  accept?: string;
  multiple?: boolean;
  onChange?: (files: FileList | null) => void;
  fullWidth?: boolean;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ label, error, helperText, onChange, fullWidth = false, className, ...props }, ref) => {
    const [fileNames, setFileNames] = React.useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        setFileNames(Array.from(files).map((f) => f.name));
        onChange?.(files);
      }
    };

    return (
      <div className={cn(fullWidth && 'w-full')}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div
          className={cn(
            'relative border-2 border-dashed rounded-lg p-6',
            'border-gray-300 hover:border-gray-400',
            'transition-colors duration-200',
            error && 'border-red-500',
            className
          )}
        >
          <input
            ref={ref}
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            {...props}
          />
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-medium text-[#C9A962]">Click to upload</span> or drag and drop
            </p>
            {fileNames.length > 0 && (
              <p className="mt-2 text-sm text-gray-900">{fileNames.join(', ')}</p>
            )}
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

FileInput.displayName = 'FileInput';

// Form group
interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function FormGroup({ children, className }: FormGroupProps) {
  return <div className={cn('space-y-4', className)}>{children}</div>;
}

// Form row
interface FormRowProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function FormRow({ children, className, columns = 2 }: FormRowProps) {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-4', columnClasses[columns], className)}>
      {children}
    </div>
  );
}
