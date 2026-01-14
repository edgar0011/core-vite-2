import { Table } from '@radix-ui/themes'
import type { CSSProperties, FC } from 'react'

import { cn } from '~/lib/utils'

import './table-row.module.scss'
import type { TableRowProps } from './table-row.types'

/**
 * TableRow component - A table row wrapper using Radix UI primitives.
 */
export const TableRow: FC<TableRowProps> = ({
  children,
  className,
  selected,
  onClick,
  style,
  ...props
}) => {
  const selectedStyle: CSSProperties | undefined = selected
    ? {
        backgroundColor: 'var(--accent-3)',
      }
    : undefined

  return (
    <Table.Row
      className={cn(onClick && 'cursor-pointer', className)}
      onClick={onClick}
      style={{ ...selectedStyle, ...style }}
      data-selected={selected || undefined}
      {...props}
    >
      {children}
    </Table.Row>
  )
}

TableRow.displayName = 'TableRow'

export type TableRowType = typeof TableRow

