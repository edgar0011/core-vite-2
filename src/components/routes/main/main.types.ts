import type { ComponentProps, PropsWithChildren } from 'react'

export type MainProps = ComponentProps<'div'> &
  PropsWithChildren & {
    /** The title to display in the main */
    title?: string
    /** The description text to display */
    description?: string
    /** The label for the action button */
    buttonLabel?: string
    /** Handler function called when the button is clicked */
    onButtonClick?: () => void
  }
