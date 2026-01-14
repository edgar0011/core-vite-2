import { Table } from '@radix-ui/themes'

import { TableRow } from '~/components/atoms/table-row/table-row'
import type { TableRowColumn } from '~/components/atoms/table-row/table-row.types'
import { fireEvent, render, screen } from '~/utils/test/test-utils'

// Helper wrapper to render rows within valid table structure
const TableWrapper = ({ children }: { children: React.ReactNode }) => (
  <Table.Root>
    <Table.Body>{children}</Table.Body>
  </Table.Root>
)

// Sample data type for tests
type TestData = { name: string; email: string; role: string }

// Default columns for tests
const defaultColumns: TableRowColumn<TestData>[] = [
  { key: 'name', render: (row) => row.name },
  { key: 'email', render: (row) => row.email },
  { key: 'role', render: (row) => row.role },
]

// Default data for tests
const defaultData: TestData = { name: 'John Doe', email: 'john@example.com', role: 'Developer' }

describe('components/atoms/table-row/TableRow', () => {
  it('renders TableRow with columns and data', () => {
    render(
      <TableWrapper>
        <TableRow columns={defaultColumns} data={defaultData} />
      </TableWrapper>,
    )

    expect(screen.getByRole('row')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <TableWrapper>
        <TableRow columns={defaultColumns} data={defaultData} className="custom-class" />
      </TableWrapper>,
    )

    const row = screen.getByRole('row')
    expect(row.className).toContain('custom-class')
  })

  it('applies selected styling when selected is true', () => {
    render(
      <TableWrapper>
        <TableRow columns={defaultColumns} data={defaultData} selected />
      </TableWrapper>,
    )

    const row = screen.getByRole('row')
    expect(row).toHaveAttribute('data-selected', 'true')
    expect(row).toHaveStyle({ backgroundColor: 'var(--accent-3)' })
  })

  it('calls onClick when row is clicked', () => {
    const mockOnClick = vi.fn()

    render(
      <TableWrapper>
        <TableRow columns={defaultColumns} data={defaultData} onClick={mockOnClick} />
      </TableWrapper>,
    )

    const row = screen.getByRole('row')
    fireEvent.click(row)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('applies cursor-pointer when onClick is provided', () => {
    render(
      <TableWrapper>
        <TableRow columns={defaultColumns} data={defaultData} onClick={() => {}} />
      </TableWrapper>,
    )

    const row = screen.getByRole('row')
    expect(row.className).toContain('cursor-pointer')
  })

  it('renders cells with correct alignment', () => {
    const columnsWithAlign: TableRowColumn<TestData>[] = [
      { key: 'name', render: (row) => row.name, align: 'left' },
      { key: 'email', render: (row) => row.email, align: 'center' },
      { key: 'role', render: (row) => row.role, align: 'right' },
    ]

    render(
      <TableWrapper>
        <TableRow columns={columnsWithAlign} data={defaultData} />
      </TableWrapper>,
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()
  })

  it('renders row header cell when isRowHeader is true', () => {
    const columnsWithRowHeader: TableRowColumn<TestData>[] = [
      { key: 'name', render: (row) => row.name, isRowHeader: true },
      { key: 'email', render: (row) => row.email },
    ]

    render(
      <TableWrapper>
        <TableRow columns={columnsWithRowHeader} data={defaultData} />
      </TableWrapper>,
    )

    expect(screen.getByRole('rowheader')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('combines selected and onClick styling', () => {
    const mockOnClick = vi.fn()

    render(
      <TableWrapper>
        <TableRow columns={defaultColumns} data={defaultData} selected onClick={mockOnClick} />
      </TableWrapper>,
    )

    const row = screen.getByRole('row')
    expect(row).toHaveAttribute('data-selected', 'true')
    expect(row.className).toContain('cursor-pointer')
  })

  it('renders cells with data-column-id and data-row-id attributes', () => {
    render(
      <TableWrapper>
        <TableRow columns={defaultColumns} data={defaultData} rowIndex={2} />
      </TableWrapper>,
    )

    const cells = screen.getAllByRole('cell')
    expect(cells[0]).toHaveAttribute('data-column-id', 'name')
    expect(cells[0]).toHaveAttribute('data-row-id', '2')
    expect(cells[1]).toHaveAttribute('data-column-id', 'email')
    expect(cells[1]).toHaveAttribute('data-row-id', '2')
    expect(cells[2]).toHaveAttribute('data-column-id', 'role')
    expect(cells[2]).toHaveAttribute('data-row-id', '2')
  })
})
