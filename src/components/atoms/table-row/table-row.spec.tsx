import { Table } from '@radix-ui/themes'

import { TableRow } from '~/components/atoms/table-row/table-row'
import { fireEvent, render, screen } from '~/utils/test/test-utils'

// Helper wrapper to render rows within valid table structure
const TableWrapper = ({ children }: { children: React.ReactNode }) => (
  <Table.Root>
    <Table.Body>{children}</Table.Body>
  </Table.Root>
)

describe('components/atoms/table-row/TableRow', () => {
  it('renders TableRow with default props', () => {
    render(
      <TableWrapper>
        <TableRow>
          <Table.Cell>Cell content</Table.Cell>
        </TableRow>
      </TableWrapper>,
    )

    expect(screen.getByRole('row')).toBeInTheDocument()
    expect(screen.getByText('Cell content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <TableWrapper>
        <TableRow className="custom-class">
          <Table.Cell>Cell content</Table.Cell>
        </TableRow>
      </TableWrapper>,
    )

    const row = screen.getByRole('row')
    expect(row.className).toContain('custom-class')
  })

  it('applies selected styling when selected is true', () => {
    render(
      <TableWrapper>
        <TableRow selected>
          <Table.Cell>Selected row</Table.Cell>
        </TableRow>
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
        <TableRow onClick={mockOnClick}>
          <Table.Cell>Clickable row</Table.Cell>
        </TableRow>
      </TableWrapper>,
    )

    const row = screen.getByRole('row')
    fireEvent.click(row)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('applies hover styling when onClick is provided', () => {
    render(
      <TableWrapper>
        <TableRow onClick={() => {}}>
          <Table.Cell>Clickable row</Table.Cell>
        </TableRow>
      </TableWrapper>,
    )

    const row = screen.getByRole('row')
    expect(row.className).toContain('cursor-pointer')
  })

  it('renders multiple cells', () => {
    render(
      <TableWrapper>
        <TableRow>
          <Table.Cell>Cell 1</Table.Cell>
          <Table.Cell>Cell 2</Table.Cell>
          <Table.Cell>Cell 3</Table.Cell>
        </TableRow>
      </TableWrapper>,
    )

    expect(screen.getByText('Cell 1')).toBeInTheDocument()
    expect(screen.getByText('Cell 2')).toBeInTheDocument()
    expect(screen.getByText('Cell 3')).toBeInTheDocument()
  })

  it('combines selected and onClick styling', () => {
    const mockOnClick = vi.fn()

    render(
      <TableWrapper>
        <TableRow selected onClick={mockOnClick}>
          <Table.Cell>Selected clickable row</Table.Cell>
        </TableRow>
      </TableWrapper>,
    )

    const row = screen.getByRole('row')
    expect(row).toHaveAttribute('data-selected', 'true')
    expect(row.className).toContain('cursor-pointer')
  })
})

