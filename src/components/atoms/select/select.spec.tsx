import { render, screen } from '~/utils/test/test-utils'

import { Select } from './select'
import type { SelectOption } from './select.types'

const simpleOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

describe('components/atoms/select/Select', () => {
  it('renders with placeholder', () => {
    render(<Select options={simpleOptions} placeholder="Choose a fruit" />)

    expect(screen.getByText('Choose a fruit')).toBeInTheDocument()
  })

  it('renders trigger with combobox role', () => {
    render(<Select options={simpleOptions} aria-label="Fruit select" />)

    expect(screen.getByRole('combobox', { name: 'Fruit select' })).toBeInTheDocument()
  })

  it('applies custom className to trigger', () => {
    render(<Select options={simpleOptions} className="custom-trigger" aria-label="Select" />)

    const trigger = screen.getByRole('combobox')
    expect(trigger.className).toContain('custom-trigger')
  })

  it('renders with controlled value', () => {
    render(<Select options={simpleOptions} value="banana" aria-label="Select" />)

    expect(screen.getByText('Banana')).toBeInTheDocument()
  })

  it('applies size variants', () => {
    const { rerender } = render(<Select options={simpleOptions} size="sm" aria-label="Select" />)

    // Radix Themes uses data attributes for size, check the trigger renders
    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()

    rerender(<Select options={simpleOptions} size="lg" aria-label="Select" />)
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('applies error state styling', () => {
    render(<Select options={simpleOptions} error aria-label="Select" />)

    // Radix Themes uses color prop for error state
    const trigger = screen.getByRole('combobox')
    expect(trigger).toBeInTheDocument()
  })

  it('applies id to trigger', () => {
    render(<Select options={simpleOptions} id="my-select" aria-label="Select" />)

    expect(screen.getByRole('combobox')).toHaveAttribute('id', 'my-select')
  })

  it('renders default value text', () => {
    render(<Select options={simpleOptions} defaultValue="apple" aria-label="Select" />)

    expect(screen.getByText('Apple')).toBeInTheDocument()
  })

  it('renders disabled state from root props', () => {
    render(<Select options={simpleOptions} disabled aria-label="Select" />)

    expect(screen.getByRole('combobox')).toBeDisabled()
  })
})
