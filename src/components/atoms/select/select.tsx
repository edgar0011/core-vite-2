import { Combobox } from '@base-ui/react'
import { forwardRef, useState } from 'react'

import { cn } from '~/lib/utils'

import type { SelectGroup, SelectOption, SelectProps } from './select.types'

function isGroupedOptions(options: SelectOption[] | SelectGroup[]): options is SelectGroup[] {
  return options.length > 0 && 'options' in options[0]
}

/** Container height & font-size per size variant */
const containerSizeClass = {
  sm: 'h-7 text-xs',
  md: 'h-9 text-sm',
  lg: 'h-11 text-base',
}

/** Horizontal padding on the input, matched to container size */
const inputPaddingClass = {
  sm: 'px-2.5',
  md: 'px-3',
  lg: 'px-4',
}

// pl-8 reserves space for the indicator when NOT selected.
// data-[selected]:pl-0 removes it when selected — the indicator (px-2 + 14px icon ≈ 32px) fills that gap.
const itemClass = cn(
  'flex cursor-pointer snap-start items-center rounded-lg py-1.5 pr-2 pl-8 leading-none outline-none select-none',
  'text-sm text-gray-800 dark:text-zinc-100',
  'transition-colors duration-75',
  'data-[highlighted]:bg-gray-100 dark:data-[highlighted]:bg-zinc-600/75',
  'data-[selected]:pl-0 data-[selected]:font-semibold',
  'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-40',
)

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.5 7l4 4L12.5 2.5" />
    </svg>
  )
}

function ChevronDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 5l4 4 4-4" />
    </svg>
  )
}

/**
 * Select component — A filterable combobox built on Base UI.
 * Supports flat and grouped options with size and error variants.
 */
export const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      options,
      placeholder = 'Select an option...',
      className,
      size = 'md',
      error = false,
      id,
      'aria-label': ariaLabel,
      value,
      defaultValue,
      onValueChange,
      disabled,
      name,
    },
    ref,
  ) => {
    // Track the raw input text so we can filter options ourselves.
    // Combobox.Empty requires the `items` prop to work; manual filtering is simpler
    // and handles both flat and grouped options uniformly.
    const [inputValue, setInputValue] = useState('')

    const query = inputValue.toLowerCase()

    const filterFlat = (opts: SelectOption[]) =>
      query ? opts.filter((o) => o.label.toLowerCase().includes(query)) : opts

    const filterGrouped = (groups: SelectGroup[]) => {
      if (!query) {
        return groups
      }
      return groups
        .map((g) => ({
          ...g,
          options: g.options.filter((o) => o.label.toLowerCase().includes(query)),
        }))
        .filter((g) => g.options.length > 0)
    }

    const renderItems = () => {
      if (isGroupedOptions(options)) {
        const filtered = filterGrouped(options)
        return filtered.map((group, groupIndex) => (
          <Combobox.Group key={group.label}>
            <Combobox.GroupLabel className="px-2 pt-2 pb-1 text-[11px] font-semibold tracking-wider text-gray-400 uppercase dark:text-zinc-500">
              {group.label}
            </Combobox.GroupLabel>
            {group.options.map((option) => (
              <Combobox.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={itemClass}
              >
                <Combobox.ItemIndicator className="flex shrink-0 items-center px-2 text-gray-500 dark:text-zinc-400">
                  <CheckIcon />
                </Combobox.ItemIndicator>
                <span className="truncate">{option.label}</span>
              </Combobox.Item>
            ))}
            {groupIndex < filtered.length - 1 && (
              <hr className="my-1 border-gray-100 dark:border-zinc-700" />
            )}
          </Combobox.Group>
        ))
      }

      return filterFlat(options).map((option) => (
        <Combobox.Item
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className={itemClass}
        >
          <Combobox.ItemIndicator className="flex shrink-0 items-center px-2 text-gray-500 dark:text-zinc-400">
            <CheckIcon />
          </Combobox.ItemIndicator>
          <span className="truncate">{option.label}</span>
        </Combobox.Item>
      ))
    }

    const isEmpty = isGroupedOptions(options)
      ? filterGrouped(options).length === 0
      : filterFlat(options).length === 0

    return (
      <Combobox.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        onInputValueChange={(val) => setInputValue(val)}
        disabled={disabled}
        name={name}
      >
        {/*
         * The border lives on this wrapper div so we can use focus-within: and
         * has-[[data-popup-open]]: to style the whole field as one unit.
         */}
        <div
          className={cn(
            'relative flex w-full items-center rounded-lg border bg-white shadow-sm',
            'transition-[border-color,box-shadow] duration-150',
            containerSizeClass[size],
            error ? 'border-red-400 dark:border-red-500' : 'border-gray-300 dark:border-zinc-700',
            error
              ? 'focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20'
              : 'focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20',
            error
              ? 'has-[[data-popup-open]]:border-red-500 has-[[data-popup-open]]:ring-2 has-[[data-popup-open]]:ring-red-500/20'
              : 'has-[[data-popup-open]]:border-blue-500 has-[[data-popup-open]]:ring-2 has-[[data-popup-open]]:ring-blue-500/20',
            'dark:bg-zinc-800',
            'dark:focus-within:border-zinc-100 dark:focus-within:ring-1 dark:focus-within:ring-zinc-100/25',
            'dark:has-[[data-popup-open]]:border-zinc-100 dark:has-[[data-popup-open]]:ring-1 dark:has-[[data-popup-open]]:ring-zinc-100/25',
            'has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
          )}
        >
          <Combobox.Input
            ref={ref}
            id={id}
            aria-label={ariaLabel}
            placeholder={placeholder}
            className={cn(
              'h-full flex-1 bg-transparent text-gray-900 outline-none',
              inputPaddingClass[size],
              'placeholder:text-gray-400',
              'disabled:cursor-not-allowed',
              'dark:text-zinc-100 dark:placeholder:text-zinc-500',
              className,
            )}
          />

          {/* Chevron — rotates 180° when popup opens (aria-expanded on the button) */}
          <Combobox.Trigger className="group flex h-full cursor-pointer items-center px-2.5 text-gray-400 transition-colors duration-150 hover:text-gray-600 disabled:cursor-not-allowed dark:text-zinc-500 dark:hover:text-zinc-200">
            <span className="transition-transform duration-200 group-aria-expanded:rotate-180">
              <ChevronDownIcon />
            </span>
          </Combobox.Trigger>
        </div>

        <Combobox.Portal>
          <Combobox.Positioner sideOffset={6}>
            <Combobox.Popup
              style={{ transformOrigin: 'var(--transform-origin)' }}
              className={cn(
                'w-[var(--anchor-width)] rounded-xl border p-1 shadow-xl outline-none',
                'border-gray-200 bg-white',
                'dark:border-zinc-700 dark:bg-zinc-800',
                'origin-top transition-[opacity,scale] duration-200 ease-in-out',
                'data-[starting-style]:scale-y-95 data-[starting-style]:opacity-0',
                'data-[ending-style]:scale-y-95 data-[ending-style]:opacity-0',
              )}
            >
              <Combobox.List className="scrollbar-none max-h-64 overflow-y-auto overscroll-contain">
                {renderItems()}
              </Combobox.List>
              {isEmpty && (
                <p className="py-6 text-center text-sm text-gray-400 dark:text-zinc-500">
                  No options found.
                </p>
              )}
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    )
  },
)

Select.displayName = 'Select'

export type SelectType = typeof Select
