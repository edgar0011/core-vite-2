import { Box } from '~/components/molecules/box/box'
import { fireEvent, render, screen } from '~/utils/test/test-utils'

describe('components/molecules/box/Box', () => {
  it('renders Box with default props', () => {
    const rendered = render(<Box />)

    expect(rendered?.container).toBeDefined()
    expect(screen.getByText('Box Title')).toBeInTheDocument()
    expect(screen.getByText('Box description text')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('renders Box with custom props', () => {
    const mockOnClick = vi.fn()

    render(
      <Box
        title="Custom Title"
        description="Custom description"
        buttonLabel="Custom Button"
        onButtonClick={mockOnClick}
        className="custom-class"
      />,
    )

    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Custom description')).toBeInTheDocument()
    expect(screen.getByText('Custom Button')).toBeInTheDocument()
  })

  it('calls onButtonClick when button is clicked', () => {
    const mockOnClick = vi.fn()

    render(<Box onButtonClick={mockOnClick} />)

    const buttons = screen.getAllByText('Action')
    const button = buttons[buttons.length - 1]

    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('renders children when provided', () => {
    render(
      <Box>
        <div data-test-id="custom-content">Custom content</div>
      </Box>,
    )

    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
    expect(screen.getByText('Custom content')).toBeInTheDocument()
  })

  it('renders Box with classes', () => {
    const rendered = render(<Box className="anotherClass" />)

    const elements = rendered?.container.querySelectorAll('.anotherClass')

    const element = elements[0] as HTMLElement

    expect(rendered?.container).toBeDefined()
    expect(elements?.length).toEqual(1)
    expect(element?.getAttribute('class')?.includes('anotherClass')).toEqual(true)
  })
})
