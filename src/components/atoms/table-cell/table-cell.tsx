import { Table } from '@radix-ui/themes'
import type { FC } from 'react'

import { cn } from '~/lib/utils'

import type { TableCellProps } from './table-cell.types'
import { tableCellVariants } from './table-cell.variants'

/**
 * TableCell component - A flexible table cell that can render as a regular cell,
 * column header, or row header using Radix UI primitives.
 */
export const TableCell: FC<TableCellProps> = ({
  variant = 'cell',
  children,
  className,
  align,
  ...props
}) => {
  const combinedClassName = cn(tableCellVariants({ align }), className)

  switch (variant) {
    case 'columnHeader':
      return (
        <Table.ColumnHeaderCell className={combinedClassName} {...props}>
          {children}
        </Table.ColumnHeaderCell>
      )
    case 'rowHeader':
      return (
        <Table.RowHeaderCell className={combinedClassName} {...props}>
          {children}
        </Table.RowHeaderCell>
      )
    case 'cell':
    default:
      return (
        <Table.Cell className={combinedClassName} {...props}>
          {children}
        </Table.Cell>
      )
  }
}

TableCell.displayName = 'TableCell'

export type TableCellType = typeof TableCell
