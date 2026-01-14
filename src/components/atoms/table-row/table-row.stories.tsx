import { Table } from '@radix-ui/themes'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { TableRow } from './table-row'
import type { TableRowColumn } from './table-row.types'

// Sample data type
type Person = { id: number; name: string; email: string; role: string }

// Default columns configuration
const defaultColumns: TableRowColumn<Person>[] = [
  { key: 'name', render: (row) => row.name },
  { key: 'email', render: (row) => row.email },
  { key: 'role', render: (row) => row.role },
]

// Sample data
const sampleData: Person = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Developer' }

const meta: Meta<typeof TableRow<Person>> = {
  title: 'components/atoms/table-row/TableRow',
  component: TableRow,
  parameters: {
    notes: `
# TableRow Component

A table row component built on Radix UI Table primitives.
Accepts columns configuration and row data, rendering TableCell components internally.
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
type Story = StoryObj<typeof TableRow<Person>>

export const Default: Story = {
  args: {
    columns: defaultColumns,
    data: sampleData,
  },
}

export const Selected: Story = {
  args: {
    columns: defaultColumns,
    data: { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Designer' },
    selected: true,
  },
}

export const Clickable: Story = {
  args: {
    columns: defaultColumns,
    data: { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Manager' },
    onClick: () => alert('Row clicked!'),
  },
}

export const WithAlignment: Story = {
  args: {
    columns: [
      { key: 'name', render: (row: Person) => row.name, align: 'left' },
      { key: 'email', render: (row: Person) => row.email, align: 'center' },
      { key: 'role', render: (row: Person) => row.role, align: 'right' },
    ],
    data: sampleData,
  },
}

export const WithRowHeader: Story = {
  args: {
    columns: [
      { key: 'name', render: (row: Person) => row.name, isRowHeader: true },
      { key: 'email', render: (row: Person) => row.email },
      { key: 'role', render: (row: Person) => row.role },
    ],
    data: sampleData,
  },
}

// Interactive example with selection
const InteractiveTemplate = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const rows: Person[] = [
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
        {rows.map((row, index) => (
          <TableRow
            key={row.id}
            columns={defaultColumns}
            data={row}
            rowIndex={index}
            selected={selectedId === row.id}
            onClick={() => setSelectedId(row.id)}
          />
        ))}
      </Table.Body>
    </Table.Root>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
  decorators: [], // Remove default decorator
}

// Multiple rows example showing different states
const MultipleRowsTemplate = () => {
  const rows: Person[] = [
    { id: 1, name: 'Regular row', email: 'regular@example.com', role: 'User' },
    { id: 2, name: 'Selected row', email: 'selected@example.com', role: 'Admin' },
    { id: 3, name: 'Clickable row', email: 'clickable@example.com', role: 'Guest' },
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
        <TableRow columns={defaultColumns} data={rows[0]} rowIndex={0} />
        <TableRow columns={defaultColumns} data={rows[1]} rowIndex={1} selected />
        <TableRow columns={defaultColumns} data={rows[2]} rowIndex={2} onClick={() => {}} />
      </Table.Body>
    </Table.Root>
  )
}

export const MultipleRows: Story = {
  render: () => <MultipleRowsTemplate />,
  decorators: [], // Remove default decorator
}
