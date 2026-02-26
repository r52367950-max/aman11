import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
  showTooltip?: boolean;
  formatValue?: (value: number) => string;
}

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className,
  disabled = false,
  showTooltip = false,
  formatValue = (v) => String(v),
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltipState, setShowTooltipState] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;

  const handleMove = useCallback(
    (clientX: number) => {
      if (!trackRef.current || disabled) return;

      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const newPercentage = (x / rect.width) * 100;
      const newValue = min + (newPercentage / 100) * (max - min);
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      onChange(clampedValue);
    },
    [min, max, step, onChange, disabled]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setIsDragging(true);
    setShowTooltipState(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    setIsDragging(true);
    setShowTooltipState(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
      setShowTooltipState(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={trackRef}
      className={cn(
        'relative h-2 bg-gray-200 rounded-full cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* Filled track */}
      <div
        className="absolute h-full bg-[#C9A962] rounded-full"
        style={{ width: `${percentage}%` }}
      />

      {/* Thumb */}
      <div
        className={cn(
          'absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-[#C9A962] rounded-full shadow-md transition-transform',
          isDragging && 'scale-110'
        )}
        style={{ left: `calc(${percentage}% - 10px)` }}
      >
        {/* Tooltip */}
        {showTooltip && showTooltipState && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap">
            {formatValue(value)}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
          </div>
        )}
      </div>
    </div>
  );
}

// Range slider (dual handle)
interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  className?: string;
  disabled?: boolean;
}

export function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className,
  disabled = false,
}: RangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [draggingHandle, setDraggingHandle] = useState<'min' | 'max' | null>(null);

  const minPercentage = ((value[0] - min) / (max - min)) * 100;
  const maxPercentage = ((value[1] - min) / (max - min)) * 100;

  const handleMove = useCallback(
    (clientX: number) => {
      if (!trackRef.current || !draggingHandle || disabled) return;

      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const newPercentage = (x / rect.width) * 100;
      const newValue = min + (newPercentage / 100) * (max - min);
      const steppedValue = Math.round(newValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      if (draggingHandle === 'min') {
        onChange([Math.min(clampedValue, value[1] - step), value[1]]);
      } else {
        onChange([value[0], Math.max(clampedValue, value[0] + step)]);
      }
    },
    [min, max, step, value, onChange, draggingHandle, disabled]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggingHandle) {
        handleMove(e.clientX);
      }
    };

    const handleEnd = () => {
      setDraggingHandle(null);
    };

    if (draggingHandle) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
    };
  }, [draggingHandle, handleMove]);

  return (
    <div
      ref={trackRef}
      className={cn(
        'relative h-2 bg-gray-200 rounded-full',
        disabled && 'opacity-50',
        className
      )}
    >
      {/* Filled range */}
      <div
        className="absolute h-full bg-[#C9A962] rounded-full"
        style={{
          left: `${minPercentage}%`,
          width: `${maxPercentage - minPercentage}%`,
        }}
      />

      {/* Min handle */}
      <div
        className={cn(
          'absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-[#C9A962] rounded-full shadow-md cursor-pointer transition-transform',
          draggingHandle === 'min' && 'scale-110'
        )}
        style={{ left: `calc(${minPercentage}% - 10px)` }}
        onMouseDown={() => !disabled && setDraggingHandle('min')}
      />

      {/* Max handle */}
      <div
        className={cn(
          'absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-[#C9A962] rounded-full shadow-md cursor-pointer transition-transform',
          draggingHandle === 'max' && 'scale-110'
        )}
        style={{ left: `calc(${maxPercentage}% - 10px)` }}
        onMouseDown={() => !disabled && setDraggingHandle('max')}
      />
    </div>
  );
}

// Price range slider with inputs
interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  currency?: string;
  className?: string;
}

export function PriceRangeSlider({
  min = 0,
  max = 1000,
  value,
  onChange,
  currency = '$',
  className,
}: PriceRangeSliderProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <RangeSlider min={min} max={max} value={value} onChange={onChange} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{currency}</span>
          <input
            type="number"
            value={value[0]}
            onChange={(e) => onChange([Number(e.target.value), value[1]])}
            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{currency}</span>
          <input
            type="number"
            value={value[1]}
            onChange={(e) => onChange([value[0], Number(e.target.value)])}
            className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
          />
        </div>
      </div>
    </div>
  );
}

// Star rating slider
interface StarRatingSliderProps {
  value: number;
  onChange: (value: number) => void;
  maxStars?: number;
  className?: string;
}

export function StarRatingSlider({
  value,
  onChange,
  maxStars = 5,
  className,
}: StarRatingSliderProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = (hoverValue !== null ? hoverValue : value) >= starValue;

        return (
          <button
            key={index}
            type="button"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(null)}
            className="p-1 transition-colors"
          >
            <svg
              className={cn(
                'w-6 h-6 transition-colors',
                isFilled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              )}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

// Volume slider
interface VolumeSliderProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export function VolumeSlider({ value, onChange, className }: VolumeSliderProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
        />
      </svg>
      <Slider
        min={0}
        max={100}
        value={value}
        onChange={onChange}
        className="flex-1"
      />
      <span className="text-sm text-gray-500 w-10 text-right">{value}%</span>
    </div>
  );
}
