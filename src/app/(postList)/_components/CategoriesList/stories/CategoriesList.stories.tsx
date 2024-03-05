import type { StoryObj } from '@storybook/react';

import { DarkmodeRenderer } from '@/lib/test-utils';
import Category from '@/types/category';

import CategoriesList from '../CategoriesList';

const categories: Category[] = [
  {
    categoryName: 'category1',
    quantity: 3,
  },
  {
    categoryName: 'category2',
    quantity: 13,
  },
  {
    categoryName: 'category3',
    quantity: 2,
  },
  {
    categoryName: 'category4',
    quantity: 6,
  },
];

export default {
  title: '카테고리/카테고리 리스트',

  component: CategoriesList,

  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        segments: ['category', 'category1'],
      },
    },
  },

  argsType: {
    categories: 'array',
  },

  args: {
    categories,
  },
};

type Story = StoryObj<typeof CategoriesList>;

export const Default: Story = {
  name: '카테고리 리스트',
};

export const Darkmode: Story = {
  name: '카테고리 리스트 (다크모드)',

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
