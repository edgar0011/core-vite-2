import '~/components/atoms/wc/Stripe'

import { Button as EsKitButton, LayoutBox, useToggle } from '@e1011/es-kit'
import { Button } from '@radix-ui/themes'
import { type FC, useState } from 'react'

import { Heading, Text } from '~/components/atoms/typography'
import { BoxLayout } from '~/components/es-kit/components/container/layoutBox/LayoutBox'
import { cn } from '~/lib/utils'

import classes from './main.module.scss'
import type { MainProps } from './main.types'

const styles = {
  stripe: { width: '600px' },
}

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

  const [progress, setProgress] = useState(40)

  const handleButtonClick = () => {
    setProgress(Math.random() * 100)
    onButtonClick?.()
  }

  return (
    <BoxLayout column wFull className={cn('', className, classes.main)} {...props}>
      <Heading as="h1">{title}</Heading>

      <Text size="6">{description}</Text>

      {children}

      <LayoutBox column>
        <Button onClick={handleButtonClick}>{buttonLabel}</Button>
        progress: {progress}
        <atom-stripe value={progress} style={styles.stripe} />
        <EsKitButton onClick={toggleSkip}>{skipped ? 'Skip' : 'Unskip'}</EsKitButton>
      </LayoutBox>
    </BoxLayout>
  )
}

Main.displayName = 'Main'

export type MainType = typeof Main
