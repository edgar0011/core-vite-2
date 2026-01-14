import { Table } from '@radix-ui/themes'

import { TableCell } from '~/components/atoms/table-cell/table-cell'
import { render, screen } from '~/utils/test/test-utils'

// Helper wrapper to render cells within valid table structure
const TableWrapper = ({ children }: { children: React.ReactNode }) => (
  <Table.Root>
    <Table.Body>
      <Table.Row>{children}</Table.Row>
    </Table.Body>
  </Table.Root>
)

const HeaderWrapper = ({ children }: { children: React.ReactNode }) => (
  <Table.Root>
    <Table.Header>
      <Table.Row>{children}</Table.Row>
    </Table.Header>
  </Table.Root>
)

describe('components/atoms/table-cell/TableCell', () => {
  it('renders TableCell with default props', () => {
    render(
      <TableWrapper>
        <TableCell>Cell content</TableCell>
      </TableWrapper>,
    )

    expect(screen.getByText('Cell content')).toBeInTheDocument()
  })

  it('renders as columnHeader variant', () => {
    render(
      <HeaderWrapper>
        <TableCell variant="columnHeader">Header content</TableCell>
      </HeaderWrapper>,
    )

    expect(screen.getByText('Header content')).toBeInTheDocument()
    expect(screen.getByRole('columnheader')).toBeInTheDocument()
  })

  it('renders as rowHeader variant', () => {
    render(
      <TableWrapper>
        <TableCell variant="rowHeader">Row header content</TableCell>
      </TableWrapper>,
    )

    expect(screen.getByText('Row header content')).toBeInTheDocument()
    expect(screen.getByRole('rowheader')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <TableWrapper>
        <TableCell className="custom-class">Cell content</TableCell>
      </TableWrapper>,
    )

    const cell = screen.getByRole('cell')
    expect(cell.className).toContain('custom-class')
  })

  it('applies alignment classes', () => {
    render(
      <TableWrapper>
        <TableCell align="center">Centered content</TableCell>
      </TableWrapper>,
    )

    const cell = screen.getByRole('cell')
    expect(cell.className).toContain('text-center')
  })

  it('renders children content', () => {
    render(
      <TableWrapper>
        <TableCell>
          <span data-test-id="child-element">Child element</span>
        </TableCell>
      </TableWrapper>,
    )

    expect(screen.getByText('Child element')).toBeInTheDocument()
  })

  it('applies data-column-id and data-row-id attributes', () => {
    render(
      <TableWrapper>
        <TableCell columnId="name" rowId={0}>
          Cell content
        </TableCell>
      </TableWrapper>,
    )

    const cell = screen.getByRole('cell')
    expect(cell).toHaveAttribute('data-column-id', 'name')
    expect(cell).toHaveAttribute('data-row-id', '0')
  })

  it('applies data attributes to columnHeader variant', () => {
    render(
      <HeaderWrapper>
        <TableCell variant="columnHeader" columnId="email">
          Header content
        </TableCell>
      </HeaderWrapper>,
    )

    const cell = screen.getByRole('columnheader')
    expect(cell).toHaveAttribute('data-column-id', 'email')
  })

  it('applies data attributes to rowHeader variant', () => {
    render(
      <TableWrapper>
        <TableCell variant="rowHeader" columnId="id" rowId={5}>
          Row header content
        </TableCell>
      </TableWrapper>,
    )

    const cell = screen.getByRole('rowheader')
    expect(cell).toHaveAttribute('data-column-id', 'id')
    expect(cell).toHaveAttribute('data-row-id', '5')
  })
})
