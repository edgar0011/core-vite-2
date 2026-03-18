import { Button, Heading, Text } from '@radix-ui/themes'
import { type FC } from 'react'

import { BoxLayout } from '~/components/es-kit/components/container/layoutBox/LayoutBox'
import { cn } from '~/lib/utils'

import classes from './main.module.scss'
import type { MainProps } from './main.types'

import { useToggle, Button as EsKitButton } from '@e1011/es-kit'

/**
 * Main component
 */
export const Main: FC<MainProps> = ({
  title = 'Main Title',
  description = 'Main description text',
  buttonLabel = 'Action',
  onButtonClick,
  className,
  children,
  ...props
}) => {

  const [skipped, toggleSkip] = useToggle(true)

  return (
    <BoxLayout column wFull className={cn('', className, classes.main)} {...props}>
      <Heading as="h1">{title}</Heading>

      <Text size="6">{description}</Text>

      {children}

      <Button onClick={onButtonClick}>{buttonLabel}</Button>

      <EsKitButton onClick={toggleSkip}>{skipped ? 'Skip' : 'Unskip'}</EsKitButton>
    </BoxLayout>
  )
}

Main.displayName = 'Main'

export type MainType = typeof Main
