import { Table } from '@radix-ui/themes'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { TableRow } from './table-row'

const meta: Meta<typeof TableRow> = {
  title: 'components/atoms/table-row/TableRow',
  component: TableRow,
  parameters: {
    notes: `
# TableRow Component

A table row component built on Radix UI Table primitives.
Supports selection state and click handling with appropriate styling.
    `,
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Story />
        </Table.Body>
      </Table.Root>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TableRow>

export const Default: Story = {
  args: {
    children: (
      <>
        <Table.Cell>John Doe</Table.Cell>
        <Table.Cell>john@example.com</Table.Cell>
        <Table.Cell>Developer</Table.Cell>
      </>
    ),
  },
}

export const Selected: Story = {
  args: {
    selected: true,
    children: (
      <>
        <Table.Cell>Jane Smith</Table.Cell>
        <Table.Cell>jane@example.com</Table.Cell>
        <Table.Cell>Designer</Table.Cell>
      </>
    ),
  },
}

export const Clickable: Story = {
  args: {
    onClick: () => alert('Row clicked!'),
    children: (
      <>
        <Table.Cell>Bob Wilson</Table.Cell>
        <Table.Cell>bob@example.com</Table.Cell>
        <Table.Cell>Manager</Table.Cell>
      </>
    ),
  },
}

// Interactive example with selection
const InteractiveTemplate = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const rows = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Manager' },
  ]

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <TableRow
            key={row.id}
            selected={selectedId === row.id}
            onClick={() => setSelectedId(row.id)}
          >
            <Table.Cell>{row.name}</Table.Cell>
            <Table.Cell>{row.email}</Table.Cell>
            <Table.Cell>{row.role}</Table.Cell>
          </TableRow>
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
  decorators: [], // Remove default decorator
}

// Multiple rows example
const MultipleRowsTemplate = () => (
  <Table.Root variant="surface">
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <TableRow>
        <Table.Cell>Regular row</Table.Cell>
        <Table.Cell>regular@example.com</Table.Cell>
        <Table.Cell>User</Table.Cell>
      </TableRow>
      <TableRow selected>
        <Table.Cell>Selected row</Table.Cell>
        <Table.Cell>selected@example.com</Table.Cell>
        <Table.Cell>Admin</Table.Cell>
      </TableRow>
      <TableRow onClick={() => {}}>
        <Table.Cell>Clickable row</Table.Cell>
        <Table.Cell>clickable@example.com</Table.Cell>
        <Table.Cell>Guest</Table.Cell>
      </TableRow>
    </Table.Body>
  </Table.Root>
)

export const MultipleRows: Story = {
  render: () => <MultipleRowsTemplate />,
  decorators: [], // Remove default decorator
}

