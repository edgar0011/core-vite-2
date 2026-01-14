import { TablePagination } from '~/components/molecules/table-pagination/table-pagination'
import { fireEvent, render, screen } from '~/utils/test/test-utils'

describe('components/molecules/table-pagination/TablePagination', () => {
  const defaultProps = {
    currentPage: 1,
    pageSize: 10,
    totalItems: 100,
    onPageChange: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders TablePagination with default props', () => {
    render(<TablePagination {...defaultProps} />)

    expect(screen.getByText('Showing 1 to 10 of 100 items')).toBeInTheDocument()
  })

  it('returns null when totalItems is 0', () => {
    render(<TablePagination {...defaultProps} totalItems={0} />)

    expect(screen.queryByText(/Showing/)).not.toBeInTheDocument()
  })

  it('shows correct items info for middle page', () => {
    render(<TablePagination {...defaultProps} currentPage={5} />)

    expect(screen.getByText('Showing 41 to 50 of 100 items')).toBeInTheDocument()
  })

  it('shows correct items info for last page', () => {
    render(<TablePagination {...defaultProps} currentPage={10} />)

    expect(screen.getByText('Showing 91 to 100 of 100 items')).toBeInTheDocument()
  })

  it('calls onPageChange when next button is clicked', () => {
    const onPageChange = vi.fn()
    render(<TablePagination {...defaultProps} onPageChange={onPageChange} />)

    const nextButton = screen.getByText('»')
    fireEvent.click(nextButton)

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange when previous button is clicked', () => {
    const onPageChange = vi.fn()
    render(<TablePagination {...defaultProps} currentPage={3} onPageChange={onPageChange} />)

    const prevButton = screen.getByText('«')
    fireEvent.click(prevButton)

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('calls onPageChange when first button is clicked', () => {
    const onPageChange = vi.fn()
    render(<TablePagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />)

    const firstButton = screen.getByText('««')
    fireEvent.click(firstButton)

    expect(onPageChange).toHaveBeenCalledWith(1)
  })

  it('calls onPageChange when last button is clicked', () => {
    const onPageChange = vi.fn()
    render(<TablePagination {...defaultProps} currentPage={1} onPageChange={onPageChange} />)

    const lastButton = screen.getByText('»»')
    fireEvent.click(lastButton)

    expect(onPageChange).toHaveBeenCalledWith(10)
  })

  it('disables previous buttons on first page', () => {
    render(<TablePagination {...defaultProps} currentPage={1} />)

    expect(screen.getByText('««')).toBeDisabled()
    expect(screen.getByText('«')).toBeDisabled()
  })

  it('disables next buttons on last page', () => {
    render(<TablePagination {...defaultProps} currentPage={10} />)

    expect(screen.getByText('»')).toBeDisabled()
    expect(screen.getByText('»»')).toBeDisabled()
  })

  it('calls onPageChange when page number is clicked', () => {
    const onPageChange = vi.fn()
    render(<TablePagination {...defaultProps} onPageChange={onPageChange} />)

    // With 100 items, 10 per page, we have 10 pages - page 2 should be visible
    const pageButton = screen.getByText('2')
    fireEvent.click(pageButton)

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  // Note: Testing the page size selector with onPageSizeChange requires
  // Radix Theme provider and additional browser APIs (ResizeObserver)
  // that are not fully available in jsdom. The selector is tested via Storybook.

  it('does not render page size selector when showPageSizeSelector is false', () => {
    const onPageSizeChange = vi.fn()
    render(
      <TablePagination
        {...defaultProps}
        onPageSizeChange={onPageSizeChange}
        showPageSizeSelector={false}
      />,
    )

    expect(screen.queryByText('Rows per page:')).not.toBeInTheDocument()
  })

  it('does not render items info when showItemsInfo is false', () => {
    render(<TablePagination {...defaultProps} showItemsInfo={false} />)

    expect(screen.queryByText(/Showing/)).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<TablePagination {...defaultProps} className="custom-class" />)

    // The Flex component should have the custom class
    const pagination = screen.getByText('Showing 1 to 10 of 100 items').closest('.custom-class')
    expect(pagination).toBeInTheDocument()
  })

  it('shows ellipsis for many pages', () => {
    render(<TablePagination {...defaultProps} currentPage={5} totalItems={200} />)

    const ellipses = screen.getAllByText('...')
    expect(ellipses.length).toBeGreaterThan(0)
  })
})
