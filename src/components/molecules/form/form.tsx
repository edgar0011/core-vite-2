import { zodResolver } from '@hookform/resolvers/zod'
import { type FC, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { cn } from '~/lib/utils'

import { buildZodSchema, renderFormField } from './form.helpers'
import styles from './form.module.scss'
import type { FormFieldConfig, FormProps } from './form.types'

/**
 * Build default values from field configurations
 */
const buildDefaultValues = (fields: FormFieldConfig[]): Record<string, string | number> => {
  const defaults: Record<string, string | number> = {}
  fields.forEach((field) => {
    defaults[field.name] = field.defaultValue ?? (field.type === 'number' ? 0 : '')
  })
  return defaults
}

/**
 * Dynamic Form component that generates forms based on field configurations
 */
export const Form: FC<FormProps> = ({
  fields,
  onSubmit,
  submitLabel = 'Submit',
  className,
  isLoading = false,
  showReset = false,
  resetLabel = 'Reset',
  children,
  ...props
}) => {
  const schema = useMemo(() => buildZodSchema(fields), [fields])
  const defaultValues = useMemo(() => buildDefaultValues(fields), [fields])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  })

  const handleFormSubmit = handleSubmit((data) => {
    onSubmit(data)
  })

  const renderField = (field: FormFieldConfig) => {
    const error = errors[field.name]
    const isRequired = !!field.validation?.required

    return (
      <div key={field.name} className={cn(styles.fieldGroup, field.className)}>
        <label htmlFor={field.name} className={styles.label}>
          {field.label}
          {isRequired && <span className={styles.required}>*</span>}
        </label>

        <Controller
          name={field.name}
          control={control}
          render={({ field: controllerField }) =>
            renderFormField({
              field,
              controllerField,
              hasError: !!error,
            })
          }
        />

        {error && <span className={styles.error}>{error.message as string}</span>}
      </div>
    )
  }

  return (
    <form onSubmit={handleFormSubmit} className={cn(styles.form, className)} noValidate {...props}>
      {fields.map(renderField)}

      {children}

      <div className={styles.actions}>
        <button type="submit" disabled={isLoading} className={styles.submitButton}>
          {isLoading ? 'Submitting...' : submitLabel}
        </button>

        {showReset && (
          <button type="button" onClick={() => reset()} className={styles.resetButton}>
            {resetLabel}
          </button>
        )}
      </div>
    </form>
  )
}

Form.displayName = 'Form'

export type FormType = typeof Form
