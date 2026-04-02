import { Button } from '@base-ui/react'
import { type FC } from 'react'
import { useLoaderData } from 'react-router'

import { Heading, Text } from '~/components/atoms/typography'
import { BoxLayout } from '~/components/es-kit/components/container/layoutBox/LayoutBox'
import { cn } from '~/lib/utils'

import type { ExamplesProps } from './examples.types'

/**
 * Examples component
 */
export const Examples: FC<ExamplesProps> = ({
  title = 'Examples',
  description = 'Component examples with async data loading.',
  buttonLabel = 'Reload',
  onButtonClick,
  className,
  children,
  ...props
}) => {
  const loaderData = useLoaderData()

  return (
    <BoxLayout
      column
      wFull
      padding="24px"
      gap="16px"
      className={cn('', className)}
      style={{
        borderRadius: 12,
        border: '1px solid hsl(var(--border))',
        backgroundColor: 'hsl(var(--card))',
      }}
      {...props}
    >
      <Heading as="h1">{title}</Heading>
      <Text size="6">{description}</Text>
      {children}
      <BoxLayout
        padding="12px 16px"
        style={{
          borderRadius: 8,
          backgroundColor: 'hsl(var(--muted))',
          color: 'hsl(var(--muted-foreground))',
          fontSize: '0.875rem',
        }}
      >
        Loader message: {loaderData?.message}
      </BoxLayout>
      <Button onClick={onButtonClick}>{buttonLabel}</Button>
    </BoxLayout>
  )
}

Examples.displayName = 'Examples'

export type ExamplesType = typeof Examples
