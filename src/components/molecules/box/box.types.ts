import type { PropsWithChildren } from 'react'

import type { BoxLayoutProps } from '~/components/es-kit/components/container/layoutBox/layoutBox.types'

export type BoxProps = BoxLayoutProps &
  PropsWithChildren & {
    /** The title to display in the box */
    title?: string
    /** The description text to display */
    description?: string
    /** The label for the action button */
    buttonLabel?: string
    /** Handler function called when the button is clicked */
    onButtonClick?: () => void
  }
