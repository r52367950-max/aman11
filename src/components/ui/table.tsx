import { cn } from '@/lib/utils';
import { ChevronUp, ChevronDown } from 'lucide-react';

// Table Container
interface TableProps {
  children: React.ReactNode;
  className?: string;
  striped?: boolean;
  hover?: boolean;
  bordered?: boolean;
}

export function Table({
  children,
  className,
  striped = false,
  hover = false,
  bordered = false,
}: TableProps) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table
        className={cn(
          'w-full text-sm text-left',
          striped && '[&_tbody_tr:nth-child(even)]:bg-gray-50',
          hover && '[&_tbody_tr:hover]:bg-gray-100',
          bordered && 'border border-gray-200 [&_th]:border [&_td]:border'
        )}
      >
        {children}
      </table>
    </div>
  );
}

// Table Head
interface TableHeadProps {
  children: React.ReactNode;
  className?: string;
}

export function TableHead({ children, className }: TableHeadProps) {
  return (
    <thead className={cn('bg-gray-50 text-gray-700 uppercase', className)}>
      {children}
    </thead>
  );
}

// Table Body
interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function TableBody({ children, className }: TableBodyProps) {
  return <tbody className={className}>{children}</tbody>;
}

// Table Row
interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function TableRow({ children, className, onClick }: TableRowProps) {
  return (
    <tr
      className={cn(
        'border-b border-gray-200',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

// Table Header Cell
interface TableHeaderCellProps {
  children: React.ReactNode;
  className?: string;
  sortable?: boolean;
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
}

export function TableHeaderCell({
  children,
  className,
  sortable,
  sortDirection,
  onSort,
}: TableHeaderCellProps) {
  return (
    <th
      className={cn(
        'px-6 py-3 font-medium text-gray-500',
        sortable && 'cursor-pointer select-none',
        className
      )}
      onClick={sortable ? onSort : undefined}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortable && (
          <span className="inline-flex flex-col">
            <ChevronUp
              className={cn(
                'w-3 h-3 -mb-1',
                sortDirection === 'asc' ? 'text-gray-900' : 'text-gray-300'
              )}
            />
            <ChevronDown
              className={cn(
                'w-3 h-3',
                sortDirection === 'desc' ? 'text-gray-900' : 'text-gray-300'
              )}
            />
          </span>
        )}
      </div>
    </th>
  );
}

// Table Cell
interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export function TableCell({ children, className }: TableCellProps) {
  return (
    <td className={cn('px-6 py-4 text-gray-900', className)}>{children}</td>
  );
}

// Table Footer
interface TableFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function TableFooter({ children, className }: TableFooterProps) {
  return (
    <tfoot className={cn('bg-gray-50 font-medium text-gray-900', className)}>
      {children}
    </tfoot>
  );
}

// Data Table (complete implementation)
interface Column<T> {
  key: string;
  header: React.ReactNode;
  cell: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string;
  className?: string;
  onRowClick?: (item: T) => void;
  emptyState?: React.ReactNode;
  sortColumn?: string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  className,
  onRowClick,
  emptyState,
  sortColumn,
  sortDirection,
  onSort,
}: DataTableProps<T>) {
  if (data.length === 0 && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <Table className={className}>
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableHeaderCell
              key={column.key}
              sortable={column.sortable}
              sortDirection={sortColumn === column.key ? sortDirection : null}
              onSort={() => onSort?.(column.key)}
              className={column.className}
            >
              {column.header}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item) => (
          <TableRow
            key={keyExtractor(item)}
            onClick={onRowClick ? () => onRowClick(item) : undefined}
          >
            {columns.map((column) => (
              <TableCell key={column.key} className={column.className}>
                {column.cell(item)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// Simple table for quick use
interface SimpleTableProps {
  headers: string[];
  rows: React.ReactNode[][];
  className?: string;
}

export function SimpleTable({ headers, rows, className }: SimpleTableProps) {
  return (
    <Table className={className}>
      <TableHead>
        <TableRow>
          {headers.map((header, i) => (
            <TableHeaderCell key={i}>{header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => (
          <TableRow key={i}>
            {row.map((cell, j) => (
              <TableCell key={j}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
