import { type CSSProperties, type FC, forwardRef, type LegacyRef } from 'react'

import { classNames, parseProps } from '~/components/es-kit/utils/helpers/ui'

import { buildLayoutBoxStyles, resolveColumnDirection } from './layoutBox.helpers'
import classes from './layoutBox.module.scss'
import type { LayoutBoxProps } from './layoutBox.types'

/**
 * Forwarded ref version of the LayoutBox component.
 * @param {LayoutBoxProps} props - Props for the LayoutBox component.
 * @param {LegacyRef<HTMLDivElement> | undefined} ref - Ref for accessing the underlying DOM element.
 * @returns {JSX.Element} - Rendered LayoutBox component.
 */
const LayoutBoxRefForwarded = forwardRef(
  (
    {
      id,
      style,
      children,
      tabIndex,
      className = '',
      column,
      asGrid = false,
      wFull = false,
      hFull = false,
      centered = false,
      flex,
      width,
      height,
      debug = false,
      background,
      ...props
    }: LayoutBoxProps,
    ref: LegacyRef<HTMLDivElement> | undefined | null,
  ) => {
    const { dataProps, restProps } = parseProps(props)
    const resolvedColumn = resolveColumnDirection(column)
    const styles = buildLayoutBoxStyles({
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
    })

    return (
      <div
        {...(id ? { id: `${id}` } : {})}
        ref={ref}
        tabIndex={tabIndex}
        className={classNames(classes['layout-box'], className)}
        style={styles as CSSProperties}
        {...dataProps}
        data-testid={dataProps.dataTestId || dataProps['data-testid'] || id}
      >
        {children}
      </div>
    )
  },
)

LayoutBoxRefForwarded.displayName = 'LayoutBox'

/**
 * LayoutBox component. Memoization is handled by the React compiler — do not wrap in memo().
 * @type {FC<LayoutBoxProps>}
 */
export const LayoutBox: FC<LayoutBoxProps> = LayoutBoxRefForwarded

/**
 * BoxLayout — alias of {@link LayoutBox}, kept for call sites using the layout-first name.
 * @type {FC<LayoutBoxProps>}
 */
export const BoxLayout: FC<LayoutBoxProps> = LayoutBoxRefForwarded
