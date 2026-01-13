import type { HTMLAttributes, PropsWithChildren } from 'react'

/**
 * Supported field types for dynamic form generation
 */
export type FieldType = 'text' | 'email' | 'tel' | 'number' | 'password' | 'textarea' | 'select'

/**
 * Validation rules for a form field
 */
export interface FieldValidation {
  /** Whether the field is required */
  required?: boolean | string
  /** Minimum length for text fields */
  minLength?: number
  /** Maximum length for text fields */
  maxLength?: number
  /** Minimum value for number fields */
  min?: number
  /** Maximum value for number fields */
  max?: number
  /** Custom regex pattern for validation */
  pattern?: RegExp
  /** Custom error message for pattern validation */
  patternMessage?: string
}

/**
 * Option for select fields
 */
export interface SelectOption {
  /** The value to be submitted */
  value: string
  /** The display label */
  label: string
}

/**
 * Configuration for a single form field
 */
export interface FormFieldConfig {
  /** Unique identifier for the field */
  name: string
  /** Display label for the field */
  label: string
  /** Type of the field */
  type: FieldType
  /** Placeholder text */
  placeholder?: string
  /** Default value */
  defaultValue?: string | number
  /** Validation rules */
  validation?: FieldValidation

  // validation Fn, accept value, return boolean and error message
  validate?: (value: unknown) => Promise<boolean>
  validateMessage?: string

  /** Options for select fields */
  options?: SelectOption[]
  /** Whether the field is disabled */
  disabled?: boolean
  /** Additional CSS class for the field */
  className?: string
}

/**
 * Props for the Form component
 */
export type FormProps = PropsWithChildren<HTMLAttributes<HTMLFormElement>> & {
  /** Array of field configurations */
  fields: FormFieldConfig[]
  /** Callback when form is submitted with valid data */
  onSubmit: (data: Record<string, unknown>) => void
  /** Label for the submit button */
  submitLabel?: string
  /** Additional CSS class for the form */
  className?: string
  /** Whether the form is in a loading state */
  isLoading?: boolean
  /** Whether to show reset button */
  showReset?: boolean
  /** Label for the reset button */
  resetLabel?: string
}

/**
 * Type for form data based on field configs
 */
export type FormData = Record<string, string | number | undefined>
