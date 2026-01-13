import { Form } from '~/components/molecules/form/form'
import type { FormFieldConfig } from '~/components/molecules/form/form.types'
import { fireEvent, render, screen, waitFor } from '~/utils/test/test-utils'

const mockFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your name',
    validation: { required: true },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'name@example.com',
    validation: { required: true },
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: '+1 555 123 4567',
  },
]

describe('components/molecules/form/Form', () => {
  it('renders Form with fields', () => {
    const mockSubmit = vi.fn()
    const rendered = render(<Form fields={mockFields} onSubmit={mockSubmit} />)

    expect(rendered?.container).toBeDefined()
    expect(screen.getByLabelText(/Full Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Phone/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('renders required field indicators', () => {
    const mockSubmit = vi.fn()
    render(<Form fields={mockFields} onSubmit={mockSubmit} />)

    const requiredIndicators = screen.getAllByText('*')
    expect(requiredIndicators.length).toBe(2) // name and email are required
  })

  it('renders with custom submit label', () => {
    const mockSubmit = vi.fn()
    render(<Form fields={mockFields} onSubmit={mockSubmit} submitLabel="Send" />)

    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument()
  })

  it('renders reset button when showReset is true', () => {
    const mockSubmit = vi.fn()
    render(<Form fields={mockFields} onSubmit={mockSubmit} showReset />)

    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
  })

  it('shows validation errors on submit with empty required fields', async () => {
    const mockSubmit = vi.fn()
    render(<Form fields={mockFields} onSubmit={mockSubmit} />)

    const submitButton = screen.getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Full Name is required')).toBeInTheDocument()
    })
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with form data when validation passes', async () => {
    const mockSubmit = vi.fn()
    render(<Form fields={mockFields} onSubmit={mockSubmit} />)

    const nameInput = screen.getByLabelText(/Full Name/)
    const emailInput = screen.getByLabelText(/Email/)

    fireEvent.change(nameInput, { target: { value: 'John Doe' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })

    const submitButton = screen.getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'John Doe',
          email: 'john@example.com',
        }),
      )
    })
  })

  it('shows email validation error for invalid email', async () => {
    const mockSubmit = vi.fn()
    render(<Form fields={mockFields} onSubmit={mockSubmit} />)

    const nameInput = screen.getByLabelText(/Full Name/)
    const emailInput = screen.getByLabelText(/Email/)

    fireEvent.change(nameInput, { target: { value: 'John' } })
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })

    const submitButton = screen.getByRole('button', { name: 'Submit' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    })
  })

  it('renders select field correctly', () => {
    const fieldsWithSelect: FormFieldConfig[] = [
      {
        name: 'country',
        label: 'Country',
        type: 'select',
        options: [
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
        ],
      },
    ]

    const mockSubmit = vi.fn()
    render(<Form fields={fieldsWithSelect} onSubmit={mockSubmit} />)

    expect(screen.getByLabelText(/Country/)).toBeInTheDocument()
    expect(screen.getByText('United States')).toBeInTheDocument()
    expect(screen.getByText('United Kingdom')).toBeInTheDocument()
  })

  it('disables submit button when isLoading is true', () => {
    const mockSubmit = vi.fn()
    render(<Form fields={mockFields} onSubmit={mockSubmit} isLoading />)

    const submitButton = screen.getByRole('button', { name: 'Submitting...' })
    expect(submitButton).toBeDisabled()
  })
})
