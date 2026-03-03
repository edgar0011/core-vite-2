import { fireEvent, render, screen, waitFor } from '~/utils/test/test-utils'

import { Select } from './select'
import type { SelectGroup, SelectOption } from './select.types'

const simpleOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
]

const groupedOptions: SelectGroup[] = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
    ],
  },
  {
    label: 'Vegetables',
    options: [{ value: 'carrot', label: 'Carrot' }],
  },
]

const openDropdown = () => fireEvent.click(screen.getByRole('button'))

const typeInInput = (text: string) => {
  fireEvent.change(screen.getByRole('combobox'), { target: { value: text } })
}

describe('components/atoms/select/Select', () => {
  describe('input element', () => {
    it('renders with placeholder', () => {
      render(<Select options={simpleOptions} placeholder="Choose a fruit" />)

      expect(screen.getByPlaceholderText('Choose a fruit')).toBeInTheDocument()
    })

    it('renders input with combobox role', () => {
      render(<Select options={simpleOptions} aria-label="Fruit select" />)

      expect(screen.getByRole('combobox', { name: 'Fruit select' })).toBeInTheDocument()
    })

    it('applies custom className to input', () => {
      render(<Select options={simpleOptions} className="custom-input" aria-label="Select" />)

      expect(screen.getByRole('combobox')).toHaveClass('custom-input')
    })

    it('applies id to input', () => {
      render(<Select options={simpleOptions} id="my-select" aria-label="Select" />)

      expect(screen.getByRole('combobox')).toHaveAttribute('id', 'my-select')
    })

    it('disables the input when disabled prop is passed', () => {
      render(<Select options={simpleOptions} disabled aria-label="Select" />)

      expect(screen.getByRole('combobox')).toBeDisabled()
    })
  })

  describe('value display', () => {
    it('marks the controlled value as selected in the dropdown', async () => {
      render(<Select options={simpleOptions} value="banana" aria-label="Select" />)

      openDropdown()

      await waitFor(() =>
        expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute(
          'aria-selected',
          'true',
        ),
      )
    })

    it('marks the default value as selected in the dropdown', async () => {
      render(<Select options={simpleOptions} defaultValue="apple" aria-label="Select" />)

      openDropdown()

      await waitFor(() =>
        expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute(
          'aria-selected',
          'true',
        ),
      )
    })
  })

  describe('dropdown', () => {
    it('opens and shows all options on trigger click', async () => {
      render(<Select options={simpleOptions} aria-label="Select" />)

      openDropdown()

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Cherry' })).toBeInTheDocument()
      })
    })

    it('filters options as the user types', async () => {
      render(<Select options={simpleOptions} aria-label="Select" />)

      openDropdown()
      await waitFor(() => expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument())

      typeInInput('ban')

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument()
        expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument()
        expect(screen.queryByRole('option', { name: 'Cherry' })).not.toBeInTheDocument()
      })
    })

    it('shows "No options found." when filter matches nothing', async () => {
      render(<Select options={simpleOptions} aria-label="Select" />)

      openDropdown()
      await waitFor(() => expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument())

      typeInInput('xyz')

      await waitFor(() => {
        expect(screen.getByText('No options found.')).toBeInTheDocument()
      })
    })

    it('restores all options when the input is cleared', async () => {
      render(<Select options={simpleOptions} aria-label="Select" />)

      openDropdown()
      await waitFor(() => expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument())

      typeInInput('ban')
      await waitFor(() =>
        expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument(),
      )

      typeInInput('')

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Cherry' })).toBeInTheDocument()
      })
    })
  })

  describe('grouped options', () => {
    it('renders group labels', async () => {
      render(<Select options={groupedOptions} aria-label="Select" />)

      openDropdown()

      await waitFor(() => {
        expect(screen.getByText('Fruits')).toBeInTheDocument()
        expect(screen.getByText('Vegetables')).toBeInTheDocument()
      })
    })

    it('renders options within groups', async () => {
      render(<Select options={groupedOptions} aria-label="Select" />)

      openDropdown()

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'Carrot' })).toBeInTheDocument()
      })
    })

    it('filters options across groups', async () => {
      render(<Select options={groupedOptions} aria-label="Select" />)

      openDropdown()
      await waitFor(() => expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument())

      typeInInput('carrot')

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Carrot' })).toBeInTheDocument()
        expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument()
        expect(screen.queryByText('Fruits')).not.toBeInTheDocument()
      })
    })
  })

  describe('callbacks', () => {
    it('calls onValueChange when an option is selected', async () => {
      const onValueChange = vi.fn()
      render(<Select options={simpleOptions} onValueChange={onValueChange} aria-label="Select" />)

      openDropdown()

      await waitFor(() => expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument())

      fireEvent.click(screen.getByRole('option', { name: 'Apple' }))

      expect(onValueChange.mock.calls[0][0]).toBe('apple')
    })
  })
})
