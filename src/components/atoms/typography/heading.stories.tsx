import type { Meta, StoryFn as Story } from '@storybook/react-vite'

import { Heading } from './heading'
import type { HeadingProps } from './heading.types'

const meta: Meta<typeof Heading> = {
  title: 'components/atoms/Typography/Heading',
  component: Heading,
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'bold'],
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    wrap: {
      control: 'select',
      options: ['wrap', 'nowrap', 'pretty', 'balance'],
    },
    trim: {
      control: 'select',
      options: ['normal', 'start', 'end', 'both'],
    },
    truncate: { control: 'boolean' },
    highContrast: { control: 'boolean' },
  },
}

export default meta

const Template: Story<HeadingProps> = (args) => <Heading {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Default Heading',
}

export const Sizes: Story<HeadingProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    {(['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const).map((size) => (
      <Heading key={size} size={size}>
        Size {size} Heading
      </Heading>
    ))}
  </div>
)

export const Weights: Story<HeadingProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    {(['light', 'regular', 'medium', 'bold'] as const).map((weight) => (
      <Heading key={weight} size="5" weight={weight}>
        {weight} weight
      </Heading>
    ))}
  </div>
)

export const HeadingLevels: Story<HeadingProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((as) => (
      <Heading key={as} as={as} size="5">
        Rendered as {`<${as}>`}
      </Heading>
    ))}
  </div>
)

export const Truncated = Template.bind({})
Truncated.args = {
  children: 'This is a very long heading that should be truncated when it overflows the container',
  truncate: true,
  size: '5',
}
Truncated.decorators = [
  (StoryComponent) => (
    <div style={{ maxWidth: '300px' }}>
      <StoryComponent />
    </div>
  ),
]

export const HighContrast = Template.bind({})
HighContrast.args = {
  children: 'High Contrast Heading',
  highContrast: true,
  size: '6',
}

export const Aligned: Story<HeadingProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
    <Heading size="4" align="left">
      Left aligned
    </Heading>
    <Heading size="4" align="center">
      Center aligned
    </Heading>
    <Heading size="4" align="right">
      Right aligned
    </Heading>
  </div>
)
