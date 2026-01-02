import type { Meta, StoryFn as Story } from '@storybook/react-vite'

import { Box } from '~/components/molecules/box/box'
import type { BoxProps } from '~/components/molecules/box/box.types'

export default {
  title: 'components/molecules/box/box/box',
  component: Box,
  parameters: {
    notes: `
# Box

The Box component is a compact component that displays a title and a button with a custom label.
It supports custom press handling for the button and is designed for efficient use of space.
    `,
    withGraphqlClient: false,
  },
} as Meta

const BoxTemplate: Story<BoxProps> = (args) => (
  <div className="flex h-[80vh] w-full items-center justify-center">
    <Box {...args} />
  </div>
)

export const BoxBase: Story<BoxProps> = (args, context) => BoxTemplate(args, context)

BoxBase.args = {
  title: 'Sample Box',
  description: 'This is a sample box description that shows how the component works.',
  buttonLabel: 'Click Me',
  onButtonClick: () => console.log('Box button clicked!'),
}
