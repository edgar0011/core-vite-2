import { Select } from '@radix-ui/themes'
import type { ComponentPropsWithoutRef } from 'react'

/** Option item for Select component */
export interface SelectOption {
  /** Unique value for the option */
  value: string
  /** Display label for the option */
  label: string
  /** Whether the option is disabled */
  disabled?: boolean
}

/** Group of options with a label */
export interface SelectGroup {
  /** Label for the group */
  label: string
  /** Options in the group */
  options: SelectOption[]
}

/** Props for the Select component */
export interface SelectProps extends Omit<
  ComponentPropsWithoutRef<typeof Select.Root>,
  'children' | 'size'
> {
  /** Array of options or grouped options */
  options: SelectOption[] | SelectGroup[]
  /** Placeholder text when no value is selected */
  placeholder?: string
  /** Additional class name for the trigger */
  className?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the select is in an error state */
  error?: boolean
  /** ID for the trigger element */
  id?: string
  /** aria-label for accessibility */
  'aria-label'?: string
  /** Trigger variant from Radix Themes */
  variant?: 'classic' | 'surface' | 'soft' | 'ghost'
}
