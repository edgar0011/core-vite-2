import { Examples } from '~/components/routes/examples/examples'
import { fireEvent, renderWithRouter, screen, waitFor } from '~/utils/test/test-utils'

const mockLoaderData = { message: 'Hello from the loader!' }

describe('components/routes/examples/Examples', () => {
  it('renders Examples with default props', async () => {
    const rendered = await renderWithRouter(<Examples />, { loaderData: mockLoaderData })

    expect(rendered?.container).toBeDefined()
    await waitFor(() => {
      expect(screen.getByText('Examples')).toBeInTheDocument()
    })
    expect(screen.getByText('Component examples with async data loading.')).toBeInTheDocument()
    expect(screen.getByText('Reload')).toBeInTheDocument()
  })

  it('renders Examples with custom props', async () => {
    const mockOnClick = vi.fn()

    await renderWithRouter(
      <Examples
        title="Custom Title"
        description="Custom description"
        buttonLabel="Custom Button"
        onButtonClick={mockOnClick}
        className="custom-class"
      />,
      { loaderData: mockLoaderData },
    )

    expect(screen.getByText('Custom Title')).toBeInTheDocument()
    expect(screen.getByText('Custom description')).toBeInTheDocument()
    expect(screen.getByText('Custom Button')).toBeInTheDocument()
  })

  it('calls onButtonClick when button is clicked', async () => {
    const mockOnClick = vi.fn()

    await renderWithRouter(<Examples onButtonClick={mockOnClick} />, { loaderData: mockLoaderData })

    const buttons = screen.getAllByText('Reload')
    const button = buttons[buttons.length - 1]

    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('renders children when provided', async () => {
    await renderWithRouter(
      <Examples>
        <div data-testid="custom-content">Custom content</div>
      </Examples>,
      { loaderData: mockLoaderData },
    )

    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
    expect(screen.getByText('Custom content')).toBeInTheDocument()
  })

  it('renders Examples with classes', async () => {
    const rendered = await renderWithRouter(<Examples className="anotherClass" />, {
      loaderData: mockLoaderData,
    })

    const elements = rendered?.container.querySelectorAll('.anotherClass')

    const element = elements[0] as HTMLElement

    expect(rendered?.container).toBeDefined()
    expect(elements?.length).toEqual(1)
    expect(element?.getAttribute('class')?.includes('anotherClass')).toEqual(true)
  })

  it('renders loader data message', async () => {
    await renderWithRouter(<Examples />, { loaderData: mockLoaderData })

    expect(screen.getByText(/Hello from the loader!/)).toBeInTheDocument()
  })
})
