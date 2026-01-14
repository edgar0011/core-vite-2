import type { Table } from '@radix-ui/themes'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

type RadixRowProps = ComponentPropsWithoutRef<typeof Table.Row>

export type TableRowColumn<T> = {
  /** Unique key for the column */
  key: string
  /** Function to render cell content */
  render: (row: T, rowIndex: number) => ReactNode
  /** Text alignment for the column */
  align?: 'left' | 'center' | 'right'
  /** Whether this column should be a row header */
  isRowHeader?: boolean
}

export type TableRowProps<T = unknown> = {
  /** Column configuration */
  columns: TableRowColumn<T>[]
  /** Row data */
  data: T
  /** Row index for render functions */
  rowIndex?: number
  /** Additional CSS class name */
  className?: string
  /** Whether the row is selected/highlighted */
  selected?: boolean
  /** Click handler for the row */
  onClick?: () => void
} & Omit<RadixRowProps, 'children'>
