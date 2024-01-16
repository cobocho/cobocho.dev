import Header from '@/app/_components/Header/Header';
import { within, userEvent } from '@storybook/testing-library';

import type { StoryObj } from '@storybook/react';

export default {
  title: '공통/헤더',

  parameters: {
    layout: 'fullscreen',
  },

  component: () => {
    return (
      <div
        style={{
          height: '2000px',
        }}
      >
        <Header />
      </div>
    );
  },
};

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  name: '라이트 모드',
};

export const Toggle: Story = {
  name: '다크 모드',

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggleButton = canvas.getByRole('button');

    await userEvent.click(toggleButton);
  },
};
