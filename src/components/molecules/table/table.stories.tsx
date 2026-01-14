import { Badge, Link } from '@radix-ui/themes'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Table } from './table'
import type { TableColumn, TableProps } from './table.types'

// Sample data types
type User = {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
}

// Sample data
const sampleUsers: User[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Developer', 'Designer', 'Manager', 'Admin'][i % 4],
  status: (['active', 'inactive', 'pending'] as const)[i % 3],
  joinDate: new Date(2023, i % 12, (i % 28) + 1).toLocaleDateString(),
}))

// Column definitions
const userColumns: TableColumn<User>[] = [
  {
    key: 'name',
    header: 'Name',
    render: (row) => row.name,
    isRowHeader: true,
  },
  {
    key: 'email',
    header: 'Email',
    render: (row) => <Link href={`mailto:${row.email}`}>{row.email}</Link>,
  },
  {
    key: 'role',
    header: 'Role',
    render: (row) => row.role,
  },
  {
    key: 'status',
    header: 'Status',
    render: (row) => (
      <Badge color={row.status === 'active' ? 'green' : row.status === 'pending' ? 'yellow' : 'red'}>
        {row.status}
      </Badge>
    ),
    align: 'center',
  },
  {
    key: 'joinDate',
    header: 'Join Date',
    render: (row) => row.joinDate,
    align: 'right',
  },
]

const meta: Meta<typeof Table<User>> = {
  title: 'components/molecules/table/Table',
  component: Table,
  parameters: {
    notes: `
# Table Component

A flexible data table built on Radix UI primitives with support for:
- Custom column rendering
- Row selection
- Classic pagination
- Loading and empty states
    `,
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table<User>>

// Basic table without pagination
export const Default: Story = {
  args: {
    columns: userColumns,
    data: sampleUsers.slice(0, 5),
    getRowKey: (row) => row.id,
  },
}

// Table with pagination
const PaginatedTableComponent = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const startIndex = (currentPage - 1) * pageSize
  const paginatedData = sampleUsers.slice(startIndex, startIndex + pageSize)

  return (
    <Table<User>
      columns={userColumns}
      data={paginatedData}
      getRowKey={(row) => row.id}
      pagination={{
        currentPage,
        pageSize,
        totalItems: sampleUsers.length,
        onPageChange: setCurrentPage,
        onPageSizeChange: setPageSize,
        pageSizeOptions: [5, 10, 25, 50],
      }}
    />
  )
}

export const WithPagination: Story = {
  render: () => <PaginatedTableComponent />,
}

// Table with row click
const ClickableRowsComponent = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <Table<User>
      columns={userColumns}
      data={sampleUsers.slice(0, 10)}
      getRowKey={(row) => row.id}
      onRowClick={(row) => setSelectedId(row.id)}
      isRowSelected={(row) => row.id === selectedId}
    />
  )
}

export const ClickableRows: Story = {
  render: () => <ClickableRowsComponent />,
}

// Loading state
export const Loading: Story = {
  args: {
    columns: userColumns,
    data: [],
    getRowKey: (row) => row.id,
    isLoading: true,
  },
}

// Empty state
export const Empty: Story = {
  args: {
    columns: userColumns,
    data: [],
    getRowKey: (row) => row.id,
    emptyMessage: 'No users found. Try adjusting your filters.',
  },
}

// Size variants
export const SmallSize: Story = {
  args: {
    columns: userColumns,
    data: sampleUsers.slice(0, 5),
    getRowKey: (row) => row.id,
    size: '1',
  },
}

export const LargeSize: Story = {
  args: {
    columns: userColumns,
    data: sampleUsers.slice(0, 5),
    getRowKey: (row) => row.id,
    size: '3',
  },
}

// Ghost variant
export const GhostVariant: Story = {
  args: {
    columns: userColumns,
    data: sampleUsers.slice(0, 5),
    getRowKey: (row) => row.id,
    variant: 'ghost',
  },
}

