import type { ComponentPropsWithoutRef } from 'react'

import type { TextAlign, TextTrim, TextWeight, TextWrap } from './heading.types'

export type TextSize = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
export type TextAs = 'span' | 'div' | 'label' | 'p'

type TextSpanProps = { as?: 'span' } & Omit<ComponentPropsWithoutRef<'span'>, 'color'>
type TextDivProps = { as: 'div' } & Omit<ComponentPropsWithoutRef<'div'>, 'color'>
type TextLabelProps = { as: 'label' } & Omit<ComponentPropsWithoutRef<'label'>, 'color'>
type TextPProps = { as: 'p' } & Omit<ComponentPropsWithoutRef<'p'>, 'color'>

type TextOwnProps = {
  /** Size of the text (1-9) */
  size?: TextSize
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
}

export type TextProps = TextOwnProps & (TextSpanProps | TextDivProps | TextLabelProps | TextPProps)
