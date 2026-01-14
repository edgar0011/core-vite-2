import { Table } from '@radix-ui/themes'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { TableCell } from './table-cell'
import type { TableCellProps } from './table-cell.types'

const meta: Meta<typeof TableCell> = {
  title: 'components/atoms/table-cell/TableCell',
  component: TableCell,
  parameters: {
    notes: `
# TableCell Component

A flexible table cell component built on Radix UI Table primitives.
Supports three variants: cell, columnHeader, and rowHeader.
    `,
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Table.Root>
        <Table.Body>
          <Table.Row>
            <Story />
          </Table.Row>
        </Table.Body>
      </Table.Root>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TableCell>

export const Default: Story = {
  args: {
    children: 'Cell content',
  },
}

export const ColumnHeader: Story = {
  args: {
    variant: 'columnHeader',
    children: 'Column Header',
  },
  decorators: [
    (Story) => (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Story />
          </Table.Row>
        </Table.Header>
      </Table.Root>
    ),
  ],
}

export const RowHeader: Story = {
  args: {
    variant: 'rowHeader',
    children: 'Row Header',
  },
}

export const AlignLeft: Story = {
  args: {
    children: 'Left aligned',
    align: 'left',
  },
}

export const AlignCenter: Story = {
  args: {
    children: 'Center aligned',
    align: 'center',
  },
}

export const AlignRight: Story = {
  args: {
    children: 'Right aligned',
    align: 'right',
  },
}

// All variants together
const AllVariantsTemplate = () => (
  <Table.Root variant="surface">
    <Table.Header>
      <Table.Row>
        <TableCell variant="columnHeader">Name</TableCell>
        <TableCell variant="columnHeader" align="center">
          Status
        </TableCell>
        <TableCell variant="columnHeader" align="right">
          Amount
        </TableCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <TableCell variant="rowHeader">John Doe</TableCell>
        <TableCell align="center">Active</TableCell>
        <TableCell align="right">$1,234.56</TableCell>
      </Table.Row>
      <Table.Row>
        <TableCell variant="rowHeader">Jane Smith</TableCell>
        <TableCell align="center">Pending</TableCell>
        <TableCell align="right">$789.00</TableCell>
      </Table.Row>
    </Table.Body>
  </Table.Root>
)

export const AllVariants: Story = {
  render: () => <AllVariantsTemplate />,
  decorators: [], // Remove default decorator
}

