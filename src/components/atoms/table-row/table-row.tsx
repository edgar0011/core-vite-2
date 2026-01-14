import './table-row.module.scss'

import { Table } from '@radix-ui/themes'
import type { CSSProperties } from 'react'

import { TableCell } from '~/components/atoms/table-cell/table-cell'
import { cn } from '~/lib/utils'

import type { TableRowProps } from './table-row.types'
import { tableRowVariants } from './table-row.variants'

/**
 * TableRow component - A table row that renders TableCell components
 * based on column configuration and row data.
 */
export function TableRow<T>({
  columns,
  data,
  rowIndex = 0,
  className,
  selected = false,
  onClick,
  style,
  ...props
}: TableRowProps<T>) {
  const selectedStyle: CSSProperties | undefined = selected
    ? {
        backgroundColor: 'var(--accent-3)',
      }
    : undefined

  return (
    <Table.Row
      className={cn(tableRowVariants({ selected, clickable: Boolean(onClick) }), className)}
      onClick={onClick}
      style={{ ...selectedStyle, ...style }}
      data-selected={selected || undefined}
      {...props}
    >
      {columns.map((column, colIndex) => (
        <TableCell
          key={column.key}
          variant={column.isRowHeader && colIndex === 0 ? 'rowHeader' : 'cell'}
          align={column.align}
        >
          {column.render(data, rowIndex)}
        </TableCell>
      ))}
    </Table.Row>
  )
}

TableRow.displayName = 'TableRow'

export type TableRowType = typeof TableRow
