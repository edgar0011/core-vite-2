import type { Table } from '@radix-ui/themes'
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'

type RadixRowProps = ComponentPropsWithoutRef<typeof Table.Row>

export type TableRowProps = PropsWithChildren<{
  /** Additional CSS class name */
  className?: string
  /** Whether the row is selected/highlighted */
  selected?: boolean
  /** Click handler for the row */
  onClick?: () => void
}> &
  RadixRowProps

