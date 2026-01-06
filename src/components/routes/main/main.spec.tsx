import { Main } from '~/components/routes/main/main'
import { fireEvent, render, screen } from '~/utils/test/test-utils'

describe('components/routes/main/Main', () => {
  it('renders Main with default props', () => {
    const rendered = render(<Main />)

    expect(rendered?.container).toBeDefined()
    expect(screen.getByText('Main Title')).toBeInTheDocument()
    expect(screen.getByText('Main description text')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
  })

  it('renders Main with custom props', () => {
    const mockOnClick = vi.fn()

    render(
      <Main
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

    render(<Main onButtonClick={mockOnClick} />)

    const buttons = screen.getAllByText('Action')
    const button = buttons[buttons.length - 1]

    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('renders children when provided', () => {
    render(
      <Main>
        <div data-test-id="custom-content">Custom content</div>
      </Main>,
    )

    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
    expect(screen.getByText('Custom content')).toBeInTheDocument()
  })

  it('renders Main with classes', () => {
    const rendered = render(<Main className="anotherClass" />)

    const elements = rendered?.container.querySelectorAll('.anotherClass')

    const element = elements[0] as HTMLElement

    expect(rendered?.container).toBeDefined()
    expect(elements?.length).toEqual(1)
    expect(element?.getAttribute('class')?.includes('anotherClass')).toEqual(true)
  })
})
