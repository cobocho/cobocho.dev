import type { StoryObj } from '@storybook/react';
import PostCard from '../PostCard';
import thumbnail from '@/mocks/post/thumbnail.png';
import { FC } from 'react';
import { DarkmodeRenderer } from '@/lib/test-utils';

export default {
  title: '포스트/포스트 카드',

  component: PostCard,

  decorators: [
    (Story: FC) => {
      return (
        <div style={{ width: '500px' }}>
          <Story />
        </div>
      );
    },
  ],

  args: {
    slug: 'example-post',
    title: 'Sample Post',
    category: 'category',
    thumbnail,
    date: '2023/01/01',
    description: 'description',
    tags: ['tag1', 'tag2'],
  },
};

type Story = StoryObj<typeof PostCard>;

export const Default: Story = {
  name: '포스트 카드',
};

export const Darkmode: Story = {
  name: '포스트 카드 (다크 모드)',

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
