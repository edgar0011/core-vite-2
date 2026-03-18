import type { ComponentPropsWithoutRef } from 'react'

export type HeadingSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
export type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type TextAlign = 'left' | 'center' | 'right'
export type TextWeight = 'light' | 'regular' | 'medium' | 'bold'
export type TextWrap = 'wrap' | 'nowrap' | 'pretty' | 'balance'
export type TextTrim = 'normal' | 'start' | 'end' | 'both'

export type HeadingProps = {
  /** The heading level to render */
  as?: HeadingAs
  /** Size of the heading (1-9) */
  size?: HeadingSize
  /** Font weight */
  weight?: TextWeight
  /** Text alignment */
  align?: TextAlign
  /** Text wrapping strategy */
  wrap?: TextWrap
  /** Leading trim */
  trim?: TextTrim
  /** Truncate text with ellipsis */
  truncate?: boolean
  /** Higher contrast color */
  highContrast?: boolean
  /** Additional CSS class name */
  className?: string
} & Omit<ComponentPropsWithoutRef<'h1'>, 'color'>
