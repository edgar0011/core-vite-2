import type { Table as RadixTable } from '@radix-ui/themes'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type RadixTableRootProps = ComponentPropsWithoutRef<typeof RadixTable.Root>

export type TableColumn<T> = {
  /** Unique key for the column */
  key: string
  /** Header label for the column */
  header: ReactNode
  /** Function to render cell content */
  render: (row: T, rowIndex: number) => ReactNode
  /** Text alignment for the column */
  align?: 'left' | 'center' | 'right'
  /** Whether this column should be a row header */
  isRowHeader?: boolean
  /** Width of the column */
  width?: string | number
}

export type PaginationConfig = {
  /** Current page (1-indexed) */
  currentPage: number
  /** Number of items per page */
  pageSize: number
  /** Total number of items */
  totalItems: number
  /** Callback when page changes */
  onPageChange: (page: number) => void
  /** Callback when page size changes */
  onPageSizeChange?: (pageSize: number) => void
  /** Available page sizes */
  pageSizeOptions?: number[]
}

export type TableProps<T> = {
  /** Column configuration */
  columns: TableColumn<T>[]
  /** Data to display */
  data: T[]
  /** Function to get unique key for each row */
  getRowKey: (row: T, index: number) => string | number
  /** Pagination configuration */
  pagination?: PaginationConfig
  /** Additional CSS class name */
  className?: string
  /** Callback when a row is clicked */
  onRowClick?: (row: T, index: number) => void
  /** Function to determine if a row is selected */
  isRowSelected?: (row: T, index: number) => boolean
  /** Show loading state */
  isLoading?: boolean
  /** Message to display when no data */
  emptyMessage?: ReactNode
  /** Size variant */
  size?: '1' | '2' | '3'
  /** Visual variant */
  variant?: 'surface' | 'ghost'
} & Omit<RadixTableRootProps, 'children'>

