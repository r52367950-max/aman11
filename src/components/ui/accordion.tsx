import React, { useState, createContext, useContext, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Accordion Context
interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
  allowMultiple: boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion');
  }
  return context;
}

// Accordion Container
interface AccordionProps {
  children: ReactNode;
  defaultOpen?: string[];
  allowMultiple?: boolean;
  className?: string;
}

export function Accordion({
  children,
  defaultOpen = [],
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultOpen);

  const toggleItem = (value: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value]
      );
    } else {
      setOpenItems((prev) => (prev.includes(value) ? [] : [value]));
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, allowMultiple }}>
      <div className={cn('divide-y divide-gray-200', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

// Accordion Item
interface AccordionItemProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <div className={className} data-accordion-item={value}>
      {children}
    </div>
  );
}

// Accordion Trigger
interface AccordionTriggerProps {
  children: ReactNode;
  className?: string;
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { openItems, toggleItem } = useAccordion();
  const itemValue = React.useContext(AccordionItemValueContext);
  const isOpen = openItems.includes(itemValue);

  return (
    <button
      onClick={() => toggleItem(itemValue)}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline',
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          'h-4 w-4 shrink-0 transition-transform duration-200',
          isOpen && 'rotate-180'
        )}
      />
    </button>
  );
}

// Accordion Content
interface AccordionContentProps {
  children: ReactNode;
  className?: string;
}

// Context for item value
const AccordionItemValueContext = createContext<string>('');

export function AccordionContent({ children, className }: AccordionContentProps) {
  const { openItems } = useAccordion();
  const itemValue = React.useContext(AccordionItemValueContext);
  const isOpen = openItems.includes(itemValue);

  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-200',
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        className
      )}
    >
      <div className="pb-4">{children}</div>
    </div>
  );
}

// Complete Accordion Item with context provider
export function AccordionItemComplete({
  value,
  trigger,
  children,
  className,
}: {
  value: string;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const { openItems, toggleItem } = useAccordion();
  const isOpen = openItems.includes(value);

  return (
    <AccordionItemValueContext.Provider value={value}>
      <div className={cn('border-b border-gray-200 last:border-0', className)}>
        <button
          onClick={() => toggleItem(value)}
          className="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline"
        >
          {trigger}
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-200',
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="pb-4">{children}</div>
        </div>
      </div>
    </AccordionItemValueContext.Provider>
  );
}

// FAQ Accordion (specialized version)
interface FAQItem {
  question: string;
  answer: ReactNode;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  return (
    <Accordion className={className}>
      {items.map((item, index) => (
        <AccordionItemComplete
          key={index}
          value={`faq-${index}`}
          trigger={item.question}
        >
          <div className="text-gray-600">{item.answer}</div>
        </AccordionItemComplete>
      ))}
    </Accordion>
  );
}

// Collapsible component (single item accordion)
interface CollapsibleProps {
  children: ReactNode;
  trigger: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function Collapsible({
  children,
  trigger,
  defaultOpen = false,
  className,
}: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline"
      >
        {trigger}
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="pb-4">{children}</div>
      </div>
    </div>
  );
}

// Tree view component
interface TreeNode {
  id: string;
  label: ReactNode;
  children?: TreeNode[];
}

interface TreeViewProps {
  nodes: TreeNode[];
  className?: string;
  onNodeClick?: (node: TreeNode) => void;
}

export function TreeView({ nodes, className, onNodeClick }: TreeViewProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const renderNode = (node: TreeNode, depth: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.id);

    return (
      <div key={node.id} style={{ marginLeft: depth * 16 }}>
        <div
          className={cn(
            'flex items-center gap-2 py-2 px-2 rounded cursor-pointer hover:bg-gray-100',
            onNodeClick && 'cursor-pointer'
          )}
          onClick={() => {
            if (hasChildren) {
              toggleNode(node.id);
            }
            onNodeClick?.(node);
          }}
        >
          {hasChildren && (
            <ChevronDown
              className={cn(
                'h-4 w-4 transition-transform duration-200',
                !isExpanded && '-rotate-90'
              )}
            />
          )}
          {!hasChildren && <span className="w-4" />}
          <span className="text-sm">{node.label}</span>
        </div>
        {hasChildren && isExpanded && (
          <div>{node.children!.map((child) => renderNode(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  return <div className={className}>{nodes.map((node) => renderNode(node))}</div>;
}
