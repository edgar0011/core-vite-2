import type { CSSProperties } from 'react'

import { LayoutDirection } from './layoutBox.types'

/**
 * Map of flex values for resolving flex alignment and justification.
 * @type {Record<string, string>}
 */
const flexValueMap: Record<string, string> = {
  start: 'flex-start',
  'flex-start': 'flex-start',
  end: 'flex-end',
  'flex-end': 'flex-end',
}

/**
 * Resolves flex alignment and justification properties based on the provided value.
 * @param {string | undefined} value - The value to resolve.
 * @returns {string | undefined} - Resolved flex property value.
 */
export const resolveFlexProps = (value?: string): string | undefined =>
  value ? flexValueMap[value] || value : value

/**
 * Resolves the layout direction from the `column` helper prop.
 * @param {boolean | undefined} column - The column helper prop.
 * @returns {LayoutDirection | null} - LayoutDirection.COLUMN when set, otherwise null.
 */
export const resolveColumnDirection = (column?: boolean): LayoutDirection | null =>
  column !== undefined && column === true ? LayoutDirection.COLUMN : null

/**
 * Arguments accepted by {@link buildLayoutBoxStyles}.
 */
export type BuildLayoutBoxStylesArgs = {
  restProps: Record<string, unknown>
  resolvedColumn: LayoutDirection | null
  style?: CSSProperties
  asGrid: boolean
  centered: boolean
  wFull: boolean
  hFull: boolean
  width?: number | string
  height?: number | string
  flex?: boolean | number | string
  background?: string
  debug: boolean
}

/**
 * Combines parsed props, BoxLayout-like helpers and additional styles into one style object.
 * Pure — memoization is handled by the React compiler, not by hand.
 * @param {BuildLayoutBoxStylesArgs} args - Resolved props to build styles from.
 * @returns {CSSProperties} - The composed inline styles.
 */
export const buildLayoutBoxStyles = ({
  restProps,
  resolvedColumn,
  style,
  asGrid,
  centered,
  wFull,
  hFull,
  width,
  height,
  flex,
  background,
  debug,
}: BuildLayoutBoxStylesArgs): CSSProperties => {
  const baseStyles: CSSProperties = {
    ...(restProps as CSSProperties),
  }

  // Resolve direction (supports column helper)
  if (restProps.direction || resolvedColumn) {
    baseStyles.flexDirection = (restProps.direction ||
      resolvedColumn) as CSSProperties['flexDirection']
  }

  // Resolve alignment and justification
  if (centered) {
    baseStyles.alignItems = 'center'
    baseStyles.justifyContent = 'center'
  } else {
    if (restProps.align) {
      baseStyles.alignItems = resolveFlexProps(restProps.align as string)
    }
    if (restProps.justify) {
      baseStyles.justifyContent = resolveFlexProps(restProps.justify as string)
    }
  }

  // Flex or grid display
  if (asGrid) {
    baseStyles.display = 'grid'
  } else {
    baseStyles.display = 'flex'
  }

  // Width / height helpers
  if (wFull) {
    baseStyles.width = '100%'
  } else if (width !== undefined) {
    baseStyles.width = typeof width === 'number' ? `${width}px` : width
  }

  if (hFull) {
    baseStyles.height = '100%'
  } else if (height !== undefined) {
    baseStyles.height = typeof height === 'number' ? `${height}px` : height
  }

  // Flex helper
  if (flex !== undefined) {
    if (flex === true) {
      baseStyles.flex = 1
    } else if (typeof flex === 'number') {
      baseStyles.flex = flex
    } else {
      baseStyles.flex = flex as string
    }
  }

  // Background helper
  if (background !== undefined) {
    baseStyles.background = background
  }

  // Debug outline helper
  if (debug) {
    baseStyles.outline = '1px solid red'
  }

  // User provided style wins last
  return {
    ...baseStyles,
    ...style,
  }
}
