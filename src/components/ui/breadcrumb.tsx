import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  showHome?: boolean;
}

export function Breadcrumb({
  items,
  className,
  separator = <ChevronRight className="w-4 h-4" />,
  showHome = true,
}: BreadcrumbProps) {
  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center flex-wrap gap-1">
        {showHome && (
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
          </li>
        )}
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            <span className="mx-2 text-gray-400">{separator}</span>
            {item.href ? (
              <Link
                to={item.href}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-sm text-gray-900" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Compact breadcrumb
interface CompactBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function CompactBreadcrumb({ items, className }: CompactBreadcrumbProps) {
  const currentItem = items[items.length - 1];
  const parentItem = items.length > 1 ? items[items.length - 2] : null;

  return (
    <nav className={cn('flex items-center gap-2', className)} aria-label="Breadcrumb">
      {parentItem?.href && (
        <>
          <Link
            to={parentItem.href}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            {parentItem.label}
          </Link>
          <span className="text-gray-400">/</span>
        </>
      )}
      <span className="text-sm text-gray-900">{currentItem?.label}</span>
    </nav>
  );
}

// Page header with breadcrumb
interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      {breadcrumbs && <Breadcrumb items={breadcrumbs} className="mb-4" />}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="mt-1 text-gray-600">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}

// Section header
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-4', className)}>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="text-sm text-[#C9A962] hover:text-[#B8984D] font-medium transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
