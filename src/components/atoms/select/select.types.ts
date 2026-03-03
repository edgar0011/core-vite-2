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
export interface SelectProps {
  /** Array of options or grouped options */
  options: SelectOption[] | SelectGroup[]
  /** Placeholder text when no value is selected */
  placeholder?: string
  /** Additional class name for the input */
  className?: string
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Whether the select is in an error state */
  error?: boolean
  /** ID for the input element */
  id?: string
  /** aria-label for accessibility */
  'aria-label'?: string
  /** The selected value (controlled) */
  value?: string | null
  /** The default selected value (uncontrolled) */
  defaultValue?: string | null
  /** Callback when the selected value changes */
  onValueChange?: (value: string | null) => void
  /** Whether the select is disabled */
  disabled?: boolean
  /** Name for form submission */
  name?: string
}
