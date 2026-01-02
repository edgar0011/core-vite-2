import { Button, Heading, Text } from '@radix-ui/themes'
import { type FC } from 'react'

import { BoxLayout } from '~/components/es-kit/components/container/layoutBox/LayoutBox'
import { cn } from '~/lib/utils'

import type { BoxProps } from './box.types'

/**
 * Box component
 */
export const Box: FC<BoxProps> = ({
  title = 'Box Title',
  description = 'Box description text',
  buttonLabel = 'Action',
  onButtonClick,
  className,
  children,
  ...props
}) => {
  return (
    <BoxLayout column wFull className={cn('', className)} {...props}>
      <Heading as="h1">{title}</Heading>

      <Text size="6">{description}</Text>

      {children}

      <Button onClick={onButtonClick}>{buttonLabel}</Button>
    </BoxLayout>
  )
}

Box.displayName = 'Box'

export type BoxType = typeof Box
