import type { Meta, StoryFn as Story } from '@storybook/react-vite'

import { Text } from './text'
import type { TextProps } from './text.types'

const meta: Meta<typeof Text> = {
  title: 'components/atoms/Typography/Text',
  component: Text,
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'div', 'p', 'label'],
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

const Template: Story<TextProps> = (args) => <Text {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Default text content',
}

export const Sizes: Story<TextProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {(['1', '2', '3', '4', '5', '6', '7', '8', '9'] as const).map((size) => (
      <Text key={size} size={size}>
        Size {size} text
      </Text>
    ))}
  </div>
)

export const Weights: Story<TextProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    {(['light', 'regular', 'medium', 'bold'] as const).map((weight) => (
      <Text key={weight} size="4" weight={weight}>
        {weight} weight
      </Text>
    ))}
  </div>
)

export const Elements: Story<TextProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <Text as="span" size="3">
      Rendered as {'<span>'} (default)
    </Text>
    <Text as="p" size="3">
      Rendered as {'<p>'}
    </Text>
    <Text as="div" size="3">
      Rendered as {'<div>'}
    </Text>
    <Text as="label" size="3">
      Rendered as {'<label>'}
    </Text>
  </div>
)

export const Truncated = Template.bind({})
Truncated.args = {
  children:
    'This is a very long text that should be truncated when it overflows the container width',
  truncate: true,
  size: '3',
}
Truncated.decorators = [
  (StoryComponent) => (
    <div style={{ maxWidth: '250px' }}>
      <StoryComponent />
    </div>
  ),
]

export const HighContrast = Template.bind({})
HighContrast.args = {
  children: 'High contrast text',
  highContrast: true,
  size: '4',
}

export const Aligned: Story<TextProps> = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
    <Text as="div" size="3" align="left">
      Left aligned
    </Text>
    <Text as="div" size="3" align="center">
      Center aligned
    </Text>
    <Text as="div" size="3" align="right">
      Right aligned
    </Text>
  </div>
)
