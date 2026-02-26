import React from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
  onClick?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  active?: boolean;
}

export function Chip({
  children,
  variant = 'default',
  size = 'md',
  className,
  onClick,
  onRemove,
  disabled = false,
  active = false,
}: ChipProps) {
  const variantClasses = {
    default: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    primary: 'bg-[#C9A962] text-white hover:bg-[#B8984D]',
    success: 'bg-green-100 text-green-700 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    error: 'bg-red-100 text-red-700 hover:bg-red-200',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full font-medium transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        onClick && !disabled && 'cursor-pointer',
        active && 'ring-2 ring-[#C9A962] ring-offset-1',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
      {onRemove && !disabled && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 p-0.5 rounded-full hover:bg-black/10 transition-colors"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
}

// Chip group
interface ChipGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function ChipGroup({ children, className }: ChipGroupProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {children}
    </div>
  );
}

// Filter chips
interface FilterChipsProps<T> {
  options: { value: T; label: string }[];
  selected: T[];
  onChange: (selected: T[]) => void;
  multiple?: boolean;
  className?: string;
}

export function FilterChips<T extends string>({
  options,
  selected,
  onChange,
  multiple = true,
  className,
}: FilterChipsProps<T>) {
  const toggleOption = (value: T) => {
    if (multiple) {
      if (selected.includes(value)) {
        onChange(selected.filter((v) => v !== value));
      } else {
        onChange([...selected, value]);
      }
    } else {
      onChange(selected.includes(value) ? [] : [value]);
    }
  };

  return (
    <ChipGroup className={className}>
      {options.map((option) => (
        <Chip
          key={option.value}
          variant={selected.includes(option.value) ? 'primary' : 'default'}
          onClick={() => toggleOption(option.value)}
          active={selected.includes(option.value)}
        >
          {option.label}
        </Chip>
      ))}
    </ChipGroup>
  );
}

// Tag input
interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  className?: string;
}

export function TagInput({
  tags,
  onChange,
  placeholder = 'Add tag...',
  maxTags,
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState('');

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tags.includes(trimmed)) {
      if (!maxTags || tags.length < maxTags) {
        onChange([...tags, trimmed]);
        setInputValue('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-lg focus-within:border-[#C9A962] focus-within:ring-1 focus-within:ring-[#C9A962]',
        className
      )}
    >
      {tags.map((tag) => (
        <Chip key={tag} variant="primary" onRemove={() => removeTag(tag)}>
          {tag}
        </Chip>
      ))}
      {(!maxTags || tags.length < maxTags) && (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={tags.length === 0 ? placeholder : ''}
          className="flex-1 min-w-[100px] outline-none text-sm"
        />
      )}
    </div>
  );
}

// Category chips
interface CategoryChipsProps {
  categories: string[];
  selected: string | null;
  onSelect: (category: string | null) => void;
  className?: string;
}

export function CategoryChips({
  categories,
  selected,
  onSelect,
  className,
}: CategoryChipsProps) {
  return (
    <ChipGroup className={className}>
      <Chip
        variant={selected === null ? 'primary' : 'default'}
        onClick={() => onSelect(null)}
      >
        All
      </Chip>
      {categories.map((category) => (
        <Chip
          key={category}
          variant={selected === category ? 'primary' : 'default'}
          onClick={() => onSelect(category)}
        >
          {category}
        </Chip>
      ))}
    </ChipGroup>
  );
}
