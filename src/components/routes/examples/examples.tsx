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
  title = 'Examples Title',
  description = 'Examples description text',
  buttonLabel = 'Action',
  onButtonClick,
  className,
  children,
  ...props
}) => {
  const loaderData = useLoaderData()
  console.log('loaderData', loaderData)

  return (
    <BoxLayout column wFull className={cn('', className)} {...props}>
      <Heading as="h1">{title}</Heading>
      <Text size="6">{description}</Text>
      {children}
      message: {loaderData?.message}
      <Button onClick={onButtonClick}>{buttonLabel}</Button>
    </BoxLayout>
  )
}

Examples.displayName = 'Examples'

export type ExamplesType = typeof Examples
