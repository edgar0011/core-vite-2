import type { RefObject } from 'react'

import { render, screen } from '~/utils/test/test-utils'

import { Heading } from './heading'

const hasModuleClass = (element: HTMLElement, name: string) =>
  Array.from(element.classList).some((c) => c.includes(name))

describe('components/atoms/typography/Heading', () => {
  it('renders children', () => {
    render(<Heading>Hello</Heading>)

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders as h1 by default', () => {
    render(<Heading>Title</Heading>)

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })

  it('renders as the specified heading level', () => {
    render(<Heading as="h3">Title</Heading>)

    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Heading className="custom">Title</Heading>)

    expect(screen.getByRole('heading')).toHaveClass('custom')
  })

  it('applies size class', () => {
    render(<Heading size="9">Big</Heading>)

    expect(hasModuleClass(screen.getByRole('heading'), 'size9')).toBe(true)
  })

  it('applies weight class', () => {
    render(<Heading weight="light">Light</Heading>)

    expect(hasModuleClass(screen.getByRole('heading'), 'weightLight')).toBe(true)
  })

  it('applies alignment class', () => {
    render(<Heading align="center">Centered</Heading>)

    expect(hasModuleClass(screen.getByRole('heading'), 'alignCenter')).toBe(true)
  })

  it('applies truncate class', () => {
    render(<Heading truncate>Long text</Heading>)

    expect(hasModuleClass(screen.getByRole('heading'), 'truncate')).toBe(true)
  })

  it('applies highContrast class', () => {
    render(<Heading highContrast>Contrast</Heading>)

    expect(hasModuleClass(screen.getByRole('heading'), 'highContrast')).toBe(true)
  })

  it('forwards ref', () => {
    const ref = { current: null } as RefObject<HTMLHeadingElement | null>
    render(<Heading ref={ref}>Title</Heading>)

    expect(ref.current).toBeInstanceOf(HTMLHeadingElement)
  })

  it('passes through HTML attributes', () => {
    render(
      <Heading id="my-heading" data-testid="heading">
        Title
      </Heading>,
    )

    expect(screen.getByTestId('heading')).toHaveAttribute('id', 'my-heading')
  })
})
