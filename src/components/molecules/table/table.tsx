import { Table as RadixTable } from '@radix-ui/themes'
import { useMemo } from 'react'

import { TableCell } from '~/components/atoms/table-cell/table-cell'
import { TableRow } from '~/components/atoms/table-row/table-row'
import { TablePagination } from '~/components/molecules/table-pagination/table-pagination'
import { cn } from '~/lib/utils'

import type { TableProps } from './table.types'

/**
 * Table component - A data table with support for columns, rows, and pagination.
 * Built on top of Radix UI Table primitives.
 */
export function Table<T>({
  columns,
  data,
  getRowKey,
  pagination,
  className,
  onRowClick,
  isRowSelected,
  isLoading = false,
  emptyMessage = 'No data available',
  size = '2',
  variant = 'surface',
  ...props
}: TableProps<T>) {
  const displayData = useMemo(() => {
    if (!pagination) {
      return data
    }
    // If pagination is controlled externally, data should already be sliced
    return data
  }, [data, pagination])

  const renderHeader = () => (
    <RadixTable.Header>
      <RadixTable.Row>
        {columns.map((column) => (
          <TableCell
            key={column.key}
            variant="columnHeader"
            align={column.align}
            style={column.width ? { width: column.width } : undefined}
          >
            {column.header}
          </TableCell>
        ))}
      </RadixTable.Row>
    </RadixTable.Header>
  )

  const renderBody = () => (
    <RadixTable.Body>
      {isLoading ? (
        <RadixTable.Row>
          <TableCell colSpan={columns.length} align="center">
            <div className="py-8 text-gray-500">Loading...</div>
          </TableCell>
        </RadixTable.Row>
      ) : displayData.length === 0 ? (
        <RadixTable.Row>
          <TableCell colSpan={columns.length} align="center">
            <div className="py-8 text-gray-500">{emptyMessage}</div>
          </TableCell>
        </RadixTable.Row>
      ) : (
        displayData.map((row, rowIndex) => (
          <TableRow
            key={getRowKey(row, rowIndex)}
            onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
            selected={isRowSelected?.(row, rowIndex)}
          >
            {columns.map((column, colIndex) => (
              <TableCell
                key={column.key}
                variant={column.isRowHeader && colIndex === 0 ? 'rowHeader' : 'cell'}
                align={column.align}
              >
                {column.render(row, rowIndex)}
              </TableCell>
            ))}
          </TableRow>
        ))
      )}
    </RadixTable.Body>
  )

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <RadixTable.Root size={size} variant={variant} {...props}>
        {renderHeader()}
        {renderBody()}
      </RadixTable.Root>

      {pagination && (
        <TablePagination
          currentPage={pagination.currentPage}
          pageSize={pagination.pageSize}
          totalItems={pagination.totalItems}
          onPageChange={pagination.onPageChange}
          onPageSizeChange={pagination.onPageSizeChange}
          pageSizeOptions={pagination.pageSizeOptions}
        />
      )}
    </div>
  )
}

Table.displayName = 'Table'

export type TableType = typeof Table
