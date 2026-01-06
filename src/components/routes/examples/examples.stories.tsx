import type { Meta, StoryFn as Story } from '@storybook/react-vite'

import { Examples } from '~/components/routes/examples/examples'
import type { ExamplesProps } from '~/components/routes/examples/examples.types'

export default {
  title: 'components/routes/examples/examples/examples',
  component: Examples,
  parameters: {
    notes: `
# Examples

The Examples component is a compact component that displays a title and a button with a custom label.
It supports custom press handling for the button and is designed for efficient use of space.
    `,
  },
} as Meta

const ExamplesTemplate: Story<ExamplesProps> = (args) => (
  <div className="flex h-[80vh] w-full items-center justify-center">
    <Examples {...args} />
  </div>
)

export const ExamplesBase: Story<ExamplesProps> = (args, context) => ExamplesTemplate(args, context)

ExamplesBase.args = {
  title: 'Sample Examples',
  description: 'This is a sample examples description that shows how the component works.',
  buttonLabel: 'Click Me',
  onButtonClick: () => console.log('Examples button clicked!'),
}
