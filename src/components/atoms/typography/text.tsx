import { forwardRef } from 'react'

import { cn } from '~/lib/utils'

import classes from './text.module.scss'
import type { TextProps } from './text.types'

const sizeClass: Record<string, string> = {
  '1': classes.size1,
  '2': classes.size2,
  '3': classes.size3,
  '4': classes.size4,
  '5': classes.size5,
  '6': classes.size6,
  '7': classes.size7,
  '8': classes.size8,
  '9': classes.size9,
}

const weightClass: Record<string, string> = {
  light: classes.weightLight,
  regular: classes.weightRegular,
  medium: classes.weightMedium,
  bold: classes.weightBold,
}

const alignClass: Record<string, string> = {
  left: classes.alignLeft,
  center: classes.alignCenter,
  right: classes.alignRight,
}

const wrapClass: Record<string, string> = {
  wrap: classes.wrapWrap,
  nowrap: classes.wrapNowrap,
  pretty: classes.wrapPretty,
  balance: classes.wrapBalance,
}

const trimClass: Record<string, string> = {
  start: classes.trimStart,
  end: classes.trimEnd,
  both: classes.trimBoth,
}

export const Text = forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Tag = 'span',
      size = '3',
      weight,
      align,
      wrap,
      trim,
      truncate,
      highContrast,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <Tag
        {...(props as Record<string, unknown>)}
        ref={ref as React.Ref<never>}
        className={cn(
          classes.text,
          sizeClass[size],
          weight && weightClass[weight],
          align && alignClass[align],
          wrap && wrapClass[wrap],
          trim && trim !== 'normal' && trimClass[trim],
          truncate && classes.truncate,
          highContrast && classes.highContrast,
          className,
        )}
      >
        {children}
      </Tag>
    )
  },
)

Text.displayName = 'Text'
