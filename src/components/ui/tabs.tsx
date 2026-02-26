import React, { useState, createContext, useContext, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Tabs Context
interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider');
  }
  return context;
}

// Tabs Container
interface TabsProps {
  defaultTab: string;
  children: ReactNode;
  className?: string;
  onChange?: (tab: string) => void;
}

export function Tabs({ defaultTab, children, className, onChange }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    onChange?.(tab);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab: handleSetActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

// Tab List
interface TabListProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'pills' | 'underline' | 'bordered';
}

export function TabList({ children, className, variant = 'default' }: TabListProps) {
  const variantClasses = {
    default: 'border-b border-gray-200',
    pills: 'flex gap-2',
    underline: 'border-b border-gray-200',
    bordered: 'flex gap-1 p-1 bg-gray-100 rounded-lg',
  };

  return (
    <div className={cn('flex', variantClasses[variant], className)} role="tablist">
      {children}
    </div>
  );
}

// Tab Trigger
interface TabTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export function TabTrigger({ value, children, className, disabled }: TabTriggerProps) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      className={cn(
        'px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A962] focus:ring-offset-2',
        isActive
          ? 'text-[#1A1A1A] border-b-2 border-[#C9A962]'
          : 'text-gray-500 hover:text-gray-700 border-b-2 border-transparent',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}

// Tab Content
interface TabContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabContent({ value, children, className }: TabContentProps) {
  const { activeTab } = useTabs();
  const isActive = activeTab === value;

  if (!isActive) return null;

  return (
    <div
      role="tabpanel"
      className={cn('mt-4', className)}
    >
      {children}
    </div>
  );
}

// Vertical Tabs
interface VerticalTabsProps extends TabsProps {
  tabPosition?: 'left' | 'right';
}

export function VerticalTabs({
  children,
  className,
  tabPosition = 'left',
  ...props
}: VerticalTabsProps) {
  return (
    <Tabs {...props}>
      <div
        className={cn(
          'flex gap-6',
          tabPosition === 'right' && 'flex-row-reverse',
          className
        )}
      >
        {children}
      </div>
    </Tabs>
  );
}

// Vertical Tab List
export function VerticalTabList({ children, className }: Omit<TabListProps, 'variant'>) {
  return (
    <div className={cn('flex flex-col gap-1 min-w-[200px]', className)} role="tablist">
      {children}
    </div>
  );
}

// Vertical Tab Trigger
export function VerticalTabTrigger({
  value,
  children,
  className,
  disabled,
}: TabTriggerProps) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      className={cn(
        'px-4 py-3 text-left text-sm font-medium transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-[#C9A962]',
        isActive
          ? 'bg-[#1A1A1A] text-white'
          : 'text-gray-600 hover:bg-gray-100',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}

// Animated Tabs
interface AnimatedTabsProps extends TabsProps {
  indicatorClassName?: string;
}

export function AnimatedTabs({
  children,
  className,
  indicatorClassName,
  ...props
}: AnimatedTabsProps) {
  return (
    <Tabs {...props}>
      <div className={className}>
        {children}
      </div>
    </Tabs>
  );
}

// Animated Tab List
export function AnimatedTabList({ children, className }: Omit<TabListProps, 'variant'>) {
  const { activeTab } = useTabs();
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (listRef.current) {
      const activeButton = listRef.current.querySelector(
        `[data-tab="${activeTab}"]`
      ) as HTMLElement;
      if (activeButton) {
        setIndicatorStyle({
          left: activeButton.offsetLeft,
          width: activeButton.offsetWidth,
        });
      }
    }
  }, [activeTab]);

  return (
    <div
      ref={listRef}
      className={cn('relative flex border-b border-gray-200', className)}
      role="tablist"
    >
      {children}
      <div
        className="absolute bottom-0 h-0.5 bg-[#C9A962] transition-all duration-300"
        style={indicatorStyle}
      />
    </div>
  );
}

// Animated Tab Trigger
export function AnimatedTabTrigger({
  value,
  children,
  className,
  disabled,
}: TabTriggerProps) {
  const { activeTab, setActiveTab } = useTabs();
  const isActive = activeTab === value;

  return (
    <button
      data-tab={value}
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      className={cn(
        'px-4 py-2 text-sm font-medium transition-colors focus:outline-none',
        isActive ? 'text-[#1A1A1A]' : 'text-gray-500 hover:text-gray-700',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
}

// Scrollable Tabs
interface ScrollableTabsProps extends TabsProps {
  showScrollIndicators?: boolean;
}

export function ScrollableTabs({
  children,
  className,
  showScrollIndicators = true,
  ...props
}: ScrollableTabsProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  React.useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Tabs {...props}>
      <div className={cn('relative', className)}>
        {showScrollIndicators && canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center"
          >
            ←
          </button>
        )}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="overflow-x-auto scrollbar-hide"
        >
          {children}
        </div>
        {showScrollIndicators && canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center"
          >
            →
          </button>
        )}
      </div>
    </Tabs>
  );
}
