import { Table as RadixTable } from '@radix-ui/themes'
import { useMemo } from 'react'

import { TableCell } from '~/components/atoms/table-cell/table-cell'
import { TableRow } from '~/components/atoms/table-row/table-row'
import type { TableRowColumn } from '~/components/atoms/table-row/table-row.types'
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

  // Convert TableColumn to TableRowColumn (omit header and width which are header-only props)
  const rowColumns: TableRowColumn<T>[] = useMemo(
    () =>
      columns.map((col) => ({
        key: col.key,
        render: col.render,
        align: col.align,
        isRowHeader: col.isRowHeader,
      })),
    [columns],
  )

  const renderHeader = () => (
    <RadixTable.Header>
      <TableRow>
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
      </TableRow>
    </RadixTable.Header>
  )

  const renderBody = () => (
    <RadixTable.Body>
      {isLoading ? (
        <TableRow>
          <TableCell colSpan={columns.length} align="center">
            <div className="py-8 text-gray-500">Loading...</div>
          </TableCell>
        </TableRow>
      ) : displayData.length === 0 ? (
        <TableRow>
          <TableCell colSpan={columns.length} align="center">
            <div className="py-8 text-gray-500">{emptyMessage}</div>
          </TableCell>
        </TableRow>
      ) : (
        displayData.map((row, rowIndex) => (
          <TableRow
            key={getRowKey(row, rowIndex)}
            columns={rowColumns}
            data={row}
            rowIndex={rowIndex}
            onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
            selected={isRowSelected?.(row, rowIndex)}
          />
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
