import type { StoryObj } from '@storybook/react';

import { DarkmodeRenderer } from '@/lib/storybook-utils';

import CategoryTag from '../CategoryTag';

export default {
  title: '카테고리/카테고리 태그',

  component: CategoryTag,

  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: ['category', 'selected-category'],
      },
    },
  },

  argsType: {
    category: 'string',
    quantity: 'number',
  },
};

type Story = StoryObj<typeof CategoryTag>;

export const Default: Story = {
  name: '선택되지 않은 카테고리',

  args: {
    category: 'category',
    quantity: 3,
  },
};

export const Darkmode: Story = {
  name: '선택되지 않은 카테고리 (다크 모드)',

  args: {
    category: 'category',
    quantity: 3,
  },

  decorators: [
    (Story) => {
      return (
        <DarkmodeRenderer>
          <Story />
        </DarkmodeRenderer>
      );
    },
  ],
};

export const Selected: Story = {
  name: '선택된 카테고리',

  args: {
    category: 'selected-category',
    quantity: 3,
  },
};

export const SelectedDarkmode: Story = {
  name: '선택된 카테고리 (다크 모드)',

  args: {
    category: 'selected-category',
    quantity: 3,
  },

  decorators: [
    (Story) => {
      return (
        <DarkmodeRenderer>
          <Story />
        </DarkmodeRenderer>
      );
    },
  ],
};
