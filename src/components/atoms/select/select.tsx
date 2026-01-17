import { Select as RadixSelect } from '@radix-ui/themes'
import { forwardRef } from 'react'

import type { SelectGroup, SelectOption, SelectProps } from './select.types'

/**
 * Helper to determine if options are grouped
 */
function isGroupedOptions(options: SelectOption[] | SelectGroup[]): options is SelectGroup[] {
  return options.length > 0 && 'options' in options[0]
}

/**
 * Map our size variants to Radix Themes sizes
 */
const sizeMap = {
  sm: '1' as const,
  md: '2' as const,
  lg: '3' as const,
}

/**
 * Select component - A dropdown select built on Radix UI Themes.
 * Supports flat options or grouped options with labels.
 */
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      placeholder = 'Select an option...',
      className,
      size = 'md',
      error = false,
      id,
      'aria-label': ariaLabel,
      variant = 'surface',
      ...props
    },
    ref,
  ) => {
    const renderOptions = () => {
      if (isGroupedOptions(options)) {
        return options.map((group, groupIndex) => (
          <RadixSelect.Group key={group.label}>
            <RadixSelect.Label>{group.label}</RadixSelect.Label>
            {group.options.map((option) => (
              <RadixSelect.Item key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </RadixSelect.Item>
            ))}
            {groupIndex < options.length - 1 && <RadixSelect.Separator />}
          </RadixSelect.Group>
        ))
      }

      return options.map((option) => (
        <RadixSelect.Item key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </RadixSelect.Item>
      ))
    }

    return (
      <RadixSelect.Root size={sizeMap[size]} {...props}>
        <RadixSelect.Trigger
          ref={ref}
          id={id}
          aria-label={ariaLabel}
          className={className}
          variant={variant}
          placeholder={placeholder}
          color={error ? 'red' : undefined}
        />
        <RadixSelect.Content position="popper">{renderOptions()}</RadixSelect.Content>
      </RadixSelect.Root>
    )
  },
)

Select.displayName = 'Select'

export type SelectType = typeof Select
