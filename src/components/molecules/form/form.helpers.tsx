import type { ControllerRenderProps, FieldValues } from 'react-hook-form'
import { z } from 'zod'

import { cn } from '~/lib/utils'

import styles from './form.module.scss'
import type { FormFieldConfig } from './form.types'

/**
 * Build a Zod schema dynamically based on field configurations
 */
export const buildZodSchema = (fields: FormFieldConfig[]): z.ZodObject<z.ZodRawShape> => {
  const shape: Record<string, z.ZodTypeAny> = {}

  fields.forEach((field) => {
    let fieldSchema: z.ZodTypeAny

    switch (field.type) {
      case 'email': {
        fieldSchema = z.string().email({ message: 'Please enter a valid email address' })
        break
      }
      case 'tel': {
        fieldSchema = z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/, {
          message: 'Please enter a valid phone number',
        })
        break
      }
      case 'number': {
        fieldSchema = z.coerce.number()
        if (field.validation?.min !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(field.validation.min)
        }
        if (field.validation?.max !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).max(field.validation.max)
        }
        break
      }
      default: {
        fieldSchema = z.string()
      }
    }

    // Apply common validations for string types
    if (field.type !== 'number' && fieldSchema instanceof z.ZodString) {
      let stringSchema = fieldSchema as z.ZodString
      if (field.validation?.minLength) {
        stringSchema = stringSchema.min(field.validation.minLength, {
          message: `Minimum ${field.validation.minLength} characters required`,
        })
      }
      if (field.validation?.maxLength) {
        stringSchema = stringSchema.max(field.validation.maxLength, {
          message: `Maximum ${field.validation.maxLength} characters allowed`,
        })
      }
      if (field.validation?.pattern) {
        stringSchema = stringSchema.regex(field.validation.pattern, {
          message: field.validation.patternMessage || 'Invalid format',
        })
      }
      fieldSchema = stringSchema
    }

    // Handle required/optional
    if (!field.validation?.required) {
      fieldSchema = fieldSchema.optional().or(z.literal(''))
    } else if (typeof field.validation.required === 'string') {
      if (fieldSchema instanceof z.ZodString) {
        fieldSchema = fieldSchema.min(1, { message: field.validation.required })
      }
    } else {
      if (fieldSchema instanceof z.ZodString) {
        fieldSchema = fieldSchema.min(1, { message: `${field.label} is required` })
      }
    }

    if (field.validate) {
      fieldSchema = fieldSchema.refine(field.validate, {
        message: field.validateMessage || 'Invalid value',
      })
    }

    shape[field.name] = fieldSchema
  })

  return z.object(shape)
}

/**
 * Fields Rendering
 */

export interface FormFieldRendererProps {
  field: FormFieldConfig
  controllerField: ControllerRenderProps<FieldValues, string>
  hasError: boolean
}

/**
 * Renders the appropriate input element based on field type
 */
export const renderFormField = ({
  field,
  controllerField,
  hasError,
}: FormFieldRendererProps): React.ReactElement => {
  if (field.type === 'select') {
    return (
      <select
        {...controllerField}
        id={field.name}
        disabled={field.disabled}
        className={cn(styles.select, hasError && styles.hasError)}
      >
        <option value="">{field.placeholder || 'Select an option'}</option>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        {...controllerField}
        id={field.name}
        placeholder={field.placeholder}
        disabled={field.disabled}
        className={cn(styles.textarea, hasError && styles.hasError)}
      />
    )
  }

  return (
    <input
      {...controllerField}
      id={field.name}
      type={field.type}
      placeholder={field.placeholder}
      disabled={field.disabled}
      className={cn(styles.input, hasError && styles.hasError)}
    />
  )
}
