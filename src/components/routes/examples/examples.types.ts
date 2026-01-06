import type { ComponentProps, PropsWithChildren } from 'react'
import type { RouteProps } from 'react-router'

export type ExamplesProps = ComponentProps<'div'> &
  RouteProps &
  PropsWithChildren & {
    /** The title to display in the examples */
    title?: string
    /** The description text to display */
    description?: string
    /** The label for the action button */
    buttonLabel?: string
    /** Handler function called when the button is clicked */
    onButtonClick?: () => void
  }
