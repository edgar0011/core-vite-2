import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { TablePagination } from './table-pagination'

const meta: Meta<typeof TablePagination> = {
  title: 'components/molecules/table-pagination/TablePagination',
  component: TablePagination,
  parameters: {
    notes: `
# TablePagination Component

A classic pagination component with:
- First/Previous/Next/Last navigation buttons
- Page number buttons with ellipsis for many pages
- Page size selector
- Items info display ("Showing X to Y of Z items")
    `,
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: { control: { type: 'number', min: 1 } },
    pageSize: { control: { type: 'number', min: 1 } },
    totalItems: { control: { type: 'number', min: 0 } },
  },
}

export default meta
type Story = StoryObj<typeof TablePagination>

// Default pagination
export const Default: Story = {
  args: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 100,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}

// With page size selector
export const WithPageSizeSelector: Story = {
  args: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 100,
    onPageChange: (page) => console.log('Page changed to:', page),
    onPageSizeChange: (size) => console.log('Page size changed to:', size),
    pageSizeOptions: [5, 10, 25, 50],
  },
}

// Middle page (showing ellipsis)
export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    pageSize: 10,
    totalItems: 100,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}

// Last page
export const LastPage: Story = {
  args: {
    currentPage: 10,
    pageSize: 10,
    totalItems: 100,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}

// Few pages (no ellipsis)
export const FewPages: Story = {
  args: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 35,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}

// Many pages
export const ManyPages: Story = {
  args: {
    currentPage: 50,
    pageSize: 10,
    totalItems: 1000,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}

// Without items info
export const WithoutItemsInfo: Story = {
  args: {
    currentPage: 1,
    pageSize: 10,
    totalItems: 100,
    showItemsInfo: false,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}

// Interactive example
const InteractiveTemplate = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const totalItems = 237

  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm text-gray-600">
        Current state: Page {currentPage}, {pageSize} items per page
      </div>
      <TablePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[5, 10, 25, 50, 100]}
      />
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveTemplate />,
}

// Minimal (navigation only)
export const NavigationOnly: Story = {
  args: {
    currentPage: 3,
    pageSize: 10,
    totalItems: 100,
    showItemsInfo: false,
    showPageSizeSelector: false,
    onPageChange: (page) => console.log('Page changed to:', page),
  },
}
