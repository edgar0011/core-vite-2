import type { Table } from '@radix-ui/themes'
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

type RadixCellProps = ComponentPropsWithoutRef<typeof Table.Cell>
type RadixColumnHeaderCellProps = ComponentPropsWithoutRef<typeof Table.ColumnHeaderCell>
type RadixRowHeaderCellProps = ComponentPropsWithoutRef<typeof Table.RowHeaderCell>

export type TableCellVariant = 'cell' | 'columnHeader' | 'rowHeader'

export type TableCellProps = PropsWithChildren<{
  /** The variant of the cell - determines which Radix component is used */
  variant?: TableCellVariant
  /** Additional CSS class name */
  className?: string
  /** Text alignment */
  align?: 'left' | 'center' | 'right'
  /** Column span */
  colSpan?: number
  /** Row span */
  rowSpan?: number
}> &
  (RadixCellProps | RadixColumnHeaderCellProps | RadixRowHeaderCellProps)

