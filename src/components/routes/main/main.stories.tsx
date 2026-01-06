import type { Meta, StoryFn as Story } from '@storybook/react-vite'

import { Main } from '~/components/routes/main/main'
import type { MainProps } from '~/components/routes/main/main.types'

export default {
  title: 'components/routes/main/main/main',
  component: Main,
  parameters: {
    notes: `
# Main

The Main component is a compact component that displays a title and a button with a custom label.
It supports custom press handling for the button and is designed for efficient use of space.
    `,
  },
} as Meta

const MainTemplate: Story<MainProps> = (args) => (
  <div className="flex h-[80vh] w-full items-center justify-center">
    <Main {...args} />
  </div>
)

export const MainBase: Story<MainProps> = (args, context) => MainTemplate(args, context)

MainBase.args = {
  title: 'Sample Main',
  description: 'This is a sample main description that shows how the component works.',
  buttonLabel: 'Click Me',
  onButtonClick: () => console.log('Main button clicked!'),
}
