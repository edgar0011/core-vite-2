import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Select } from './select'
import type { SelectGroup, SelectOption } from './select.types'

const simpleOptions: SelectOption[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'grapes', label: 'Grapes' },
  { value: 'pineapple', label: 'Pineapple' },
]

const groupedOptions: SelectGroup[] = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'blueberry', label: 'Blueberry' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
  {
    label: 'Meat',
    options: [
      { value: 'beef', label: 'Beef' },
      { value: 'chicken', label: 'Chicken' },
      { value: 'pork', label: 'Pork' },
    ],
  },
]

const meta: Meta<typeof Select> = {
  title: 'components/atoms/select/Select',
  component: Select,
  parameters: {
    notes: `
# Select Component

A dropdown select component built on Radix UI Select primitives.
Supports flat options, grouped options, and various size variants.
    `,
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    options: simpleOptions,
    placeholder: 'Select a fruit...',
    'aria-label': 'Fruit selection',
  },
}

export const WithDefaultValue: Story = {
  args: {
    options: simpleOptions,
    defaultValue: 'banana',
    'aria-label': 'Fruit selection',
  },
}

export const GroupedOptions: Story = {
  args: {
    options: groupedOptions,
    placeholder: 'Select food...',
    'aria-label': 'Food selection',
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select options={simpleOptions} size="sm" placeholder="Small" aria-label="Small select" />
      <Select options={simpleOptions} size="md" placeholder="Medium" aria-label="Medium select" />
      <Select options={simpleOptions} size="lg" placeholder="Large" aria-label="Large select" />
    </div>
  ),
}

export const ErrorState: Story = {
  args: {
    options: simpleOptions,
    placeholder: 'Select a fruit...',
    error: true,
    'aria-label': 'Fruit selection with error',
  },
}

export const DisabledOptions: Story = {
  args: {
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana', disabled: true },
      { value: 'cherry', label: 'Cherry' },
      { value: 'date', label: 'Date', disabled: true },
      { value: 'elderberry', label: 'Elderberry' },
    ],
    placeholder: 'Some options disabled',
    'aria-label': 'Select with disabled options',
  },
}

// Controlled example
const ControlledTemplate = () => {
  const [value, setValue] = useState<string>('apple')

  return (
    <div className="flex flex-col gap-4">
      <Select
        options={simpleOptions}
        value={value}
        onValueChange={setValue}
        aria-label="Controlled select"
      />
      <p className="text-sm text-gray-600">Selected value: {value}</p>
    </div>
  )
}

export const Controlled: Story = {
  render: () => <ControlledTemplate />,
}

// Many options example
const ManyOptionsTemplate = () => {
  const manyOptions: SelectOption[] = Array.from({ length: 100 }, (_, i) => ({
    value: `option-${i + 1}`,
    label: `Option ${i + 1}`,
  }))

  return (
    <Select
      options={manyOptions}
      placeholder="Select from 100 options..."
      aria-label="Many options select"
    />
  )
}

export const ManyOptions: Story = {
  render: () => <ManyOptionsTemplate />,
}

// With form label example
export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <label htmlFor="country-select" className="text-sm font-medium text-gray-700">
        Country
      </label>
      <Select
        id="country-select"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
          { value: 'au', label: 'Australia' },
          { value: 'de', label: 'Germany' },
          { value: 'fr', label: 'France' },
          { value: 'jp', label: 'Japan' },
        ]}
        placeholder="Select a country..."
        aria-label="Country selection"
      />
      <p className="text-xs text-gray-500">Choose your country of residence</p>
    </div>
  ),
}
