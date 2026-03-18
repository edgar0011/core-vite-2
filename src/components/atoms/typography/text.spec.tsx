import { render, screen } from '~/utils/test/test-utils'

import { Text } from './text'

const hasModuleClass = (element: HTMLElement, name: string) =>
  Array.from(element.classList).some((c) => c.includes(name))

describe('components/atoms/typography/Text', () => {
  it('renders children', () => {
    render(<Text>Hello</Text>)

    expect(screen.getByText('Hello')).toBeInTheDocument()
  })

  it('renders as span by default', () => {
    render(<Text>Content</Text>)

    expect(screen.getByText('Content').tagName).toBe('SPAN')
  })

  it('renders as the specified element', () => {
    render(<Text as="p">Paragraph</Text>)

    expect(screen.getByText('Paragraph').tagName).toBe('P')
  })

  it('renders as label', () => {
    render(<Text as="label">Label text</Text>)

    expect(screen.getByText('Label text').tagName).toBe('LABEL')
  })

  it('renders as div', () => {
    render(<Text as="div">Div text</Text>)

    expect(screen.getByText('Div text').tagName).toBe('DIV')
  })

  it('applies custom className', () => {
    render(<Text className="custom">Content</Text>)

    expect(screen.getByText('Content')).toHaveClass('custom')
  })

  it('applies size class', () => {
    render(<Text size="6">Large</Text>)

    expect(hasModuleClass(screen.getByText('Large'), 'size6')).toBe(true)
  })

  it('applies weight class', () => {
    render(<Text weight="bold">Bold</Text>)

    expect(hasModuleClass(screen.getByText('Bold'), 'weightBold')).toBe(true)
  })

  it('applies alignment class', () => {
    render(<Text align="right">Right</Text>)

    expect(hasModuleClass(screen.getByText('Right'), 'alignRight')).toBe(true)
  })

  it('applies truncate class', () => {
    render(<Text truncate>Long text</Text>)

    expect(hasModuleClass(screen.getByText('Long text'), 'truncate')).toBe(true)
  })

  it('applies highContrast class', () => {
    render(<Text highContrast>Contrast</Text>)

    expect(hasModuleClass(screen.getByText('Contrast'), 'highContrast')).toBe(true)
  })

  it('forwards ref', () => {
    const ref = { current: null } as React.RefObject<HTMLElement>
    render(<Text ref={ref}>Content</Text>)

    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it('passes through HTML attributes', () => {
    render(
      <Text id="my-text" data-test-id="text">
        Content
      </Text>,
    )

    expect(screen.getByTestId('text')).toHaveAttribute('id', 'my-text')
  })

  it('uses size 3 by default', () => {
    render(<Text>Default</Text>)

    expect(hasModuleClass(screen.getByText('Default'), 'size3')).toBe(true)
  })
})
