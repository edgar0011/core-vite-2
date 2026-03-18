import { Button, Flex, Select } from '@radix-ui/themes'
import type { FC } from 'react'

import { Text } from '~/components/atoms/typography'

import type { PaginationConfig } from './table.types'

type TablePaginationProps = Omit<PaginationConfig, 'totalItems'> & {
  totalItems: number
}

/**
 * TablePagination component - Classic pagination controls for the Table component.
 */
export const TablePagination: FC<TablePaginationProps> = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
}) => {
  const totalPages = Math.ceil(totalItems / pageSize)
  const startItem = (currentPage - 1) * pageSize + 1
  const endItem = Math.min(currentPage * pageSize, totalItems)

  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  const handlePrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1)
    }
  }

  const handleFirst = () => {
    onPageChange(1)
  }

  const handleLast = () => {
    onPageChange(totalPages)
  }

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10)
    onPageSizeChange?.(newSize)
    // Reset to first page when page size changes
    onPageChange(1)
  }

  // Generate page numbers to show
  const getPageNumbers = (): (number | 'ellipsis')[] => {
    const pages: (number | 'ellipsis')[] = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('ellipsis')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (totalItems === 0) {
    return null
  }

  return (
    <Flex align="center" justify="between" gap="4" wrap="wrap" className="px-2 py-3">
      {/* Items info */}
      <Text size="2" className="text-gray-500">
        Showing {startItem} to {endItem} of {totalItems} items
      </Text>

      {/* Page size selector */}
      {onPageSizeChange && (
        <Flex align="center" gap="2">
          <Text size="2" className="text-gray-500">
            Rows per page:
          </Text>
          <Select.Root value={String(pageSize)} onValueChange={handlePageSizeChange}>
            <Select.Trigger />
            <Select.Content>
              {pageSizeOptions.map((size) => (
                <Select.Item key={size} value={String(size)}>
                  {size}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>
      )}

      {/* Page navigation */}
      <Flex align="center" gap="1">
        <Button variant="soft" size="1" onClick={handleFirst} disabled={!canGoPrevious}>
          ««
        </Button>
        <Button variant="soft" size="1" onClick={handlePrevious} disabled={!canGoPrevious}>
          «
        </Button>

        {getPageNumbers().map((page, index) =>
          page === 'ellipsis' ? (
            <Text key={`ellipsis-${index}`} size="2" className="px-2">
              ...
            </Text>
          ) : (
            <Button
              key={page}
              variant={page === currentPage ? 'solid' : 'soft'}
              size="1"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          ),
        )}

        <Button variant="soft" size="1" onClick={handleNext} disabled={!canGoNext}>
          »
        </Button>
        <Button variant="soft" size="1" onClick={handleLast} disabled={!canGoNext}>
          »»
        </Button>
      </Flex>
    </Flex>
  )
}

TablePagination.displayName = 'TablePagination'
