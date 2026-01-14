export type TablePaginationProps = {
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
  /** Additional CSS class name */
  className?: string
  /** Whether to show the items info text */
  showItemsInfo?: boolean
  /** Whether to show the page size selector */
  showPageSizeSelector?: boolean
}
