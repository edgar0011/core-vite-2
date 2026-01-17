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

/** Props when using columns + data pattern */
type TableRowWithColumnsProps<T> = {
  /** Column configuration */
  columns: TableRowColumn<T>[]
  /** Row data */
  data: T
  /** Row index for render functions */
  rowIndex?: number
  /** Children not allowed when using columns */
  children?: never
}

/** Props when using children directly (e.g., for header rows) */
type TableRowWithChildrenProps = {
  /** Direct children (TableCell components) */
  children: ReactNode
  /** Columns not allowed when using children */
  columns?: never
  /** Data not allowed when using children */
  data?: never
  /** Row index not needed when using children */
  rowIndex?: never
}

/** Common props for all TableRow variants */
type TableRowCommonProps = {
  /** Additional CSS class name */
  className?: string
  /** Whether the row is selected/highlighted */
  selected?: boolean
  /** Click handler for the row */
  onClick?: () => void
} & Omit<RadixRowProps, 'children'>

export type TableRowProps<T = unknown> =
  | (TableRowWithColumnsProps<T> & TableRowCommonProps)
  | (TableRowWithChildrenProps & TableRowCommonProps)
