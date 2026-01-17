import './table-row.module.scss'

import { Table } from '@radix-ui/themes'
import type { CSSProperties } from 'react'

import { TableCell } from '~/components/atoms/table-cell/table-cell'
import { cn } from '~/lib/utils'

import type { TableRowProps } from './table-row.types'
import { tableRowVariants } from './table-row.variants'

/**
 * TableRow component - A table row that renders TableCell components.
 * Supports two modes:
 * 1. Column + data mode: Pass `columns` and `data` to auto-render cells
 * 2. Children mode: Pass `children` directly (e.g., for header rows)
 */
export function TableRow<T>({
  columns,
  data,
  rowIndex = 0,
  className,
  selected = false,
  onClick,
  style,
  children,
  ...props
}: TableRowProps<T>) {
  const selectedStyle: CSSProperties | undefined = selected
    ? {
        backgroundColor: 'var(--accent-3)',
      }
    : undefined

  // If children are provided, render them directly
  if (children) {
    return (
      <Table.Row
        className={cn(tableRowVariants({ selected, clickable: Boolean(onClick) }), className)}
        onClick={onClick}
        style={{ ...selectedStyle, ...style }}
        data-selected={selected || undefined}
        {...props}
      >
        {children}
      </Table.Row>
    )
  }

  // Otherwise, render cells based on columns and data
  return (
    <Table.Row
      className={cn(tableRowVariants({ selected, clickable: Boolean(onClick) }), className)}
      onClick={onClick}
      style={{ ...selectedStyle, ...style }}
      data-selected={selected || undefined}
      {...props}
    >
      {columns?.map((column, colIndex) => (
        <TableCell
          key={column.key}
          variant={column.isRowHeader && colIndex === 0 ? 'rowHeader' : 'cell'}
          align={column.align}
          columnId={column.key}
          rowId={rowIndex}
        >
          {column.render(data as T, rowIndex)}
        </TableCell>
      ))}
    </Table.Row>
  )
}

TableRow.displayName = 'TableRow'

export type TableRowType = typeof TableRow
