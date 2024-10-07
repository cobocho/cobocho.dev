import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { OutLineMenu } from './OutLineMenu'

const meta = {
  title: 'Layout/OutLineMenu',
  component: OutLineMenu,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof OutLineMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Preview: Story = {
  parameters: {},
  render: () => (
    <OutLineMenu>
      <div className="h-[3000px] w-full bg-white" />
    </OutLineMenu>
  ),
}
