import { Examples } from '~/components/routes/examples/examples'
import { fireEvent, render, screen } from '~/utils/test/test-utils'

describe('components/routes/examples/Examples', () => {
  it('renders Examples with default props', () => {
    const rendered = render(<Examples />)

    expect(rendered?.container).toBeDefined()
    expect(screen.getByText('Examples Title')).toBeInTheDocument()
    expect(screen.getByText('Examples description text')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('renders Examples with custom props', () => {
    const mockOnClick = vi.fn()

    render(
      <Examples
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

    render(<Examples onButtonClick={mockOnClick} />)

    const buttons = screen.getAllByText('Action')
    const button = buttons[buttons.length - 1]

    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('renders children when provided', () => {
    render(
      <Examples>
        <div data-test-id="custom-content">Custom content</div>
      </Examples>,
    )

    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
    expect(screen.getByText('Custom content')).toBeInTheDocument()
  })

  it('renders Examples with classes', () => {
    const rendered = render(<Examples className="anotherClass" />)

    const elements = rendered?.container.querySelectorAll('.anotherClass')

    const element = elements[0] as HTMLElement

    expect(rendered?.container).toBeDefined()
    expect(elements?.length).toEqual(1)
    expect(element?.getAttribute('class')?.includes('anotherClass')).toEqual(true)
  })
})
