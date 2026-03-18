import { forwardRef } from 'react'

import { cn } from '~/lib/utils'

import classes from './heading.module.scss'
import type { HeadingProps } from './heading.types'

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

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      as: Tag = 'h1',
      size = '6',
      weight = 'bold',
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
        ref={ref}
        className={cn(
          classes.heading,
          sizeClass[size],
          weightClass[weight],
          align && alignClass[align],
          wrap && wrapClass[wrap],
          trim && trim !== 'normal' && trimClass[trim],
          truncate && classes.truncate,
          highContrast && classes.highContrast,
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    )
  },
)

Heading.displayName = 'Heading'
