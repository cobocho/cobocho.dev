import postMD from '@posts/example/post/post.md';
import type { Meta, StoryObj } from '@storybook/react';
import matter from 'gray-matter';
import { FC } from 'react';

import { computePostField } from '@/lib/api';
import { DarkmodeRenderer, RowPostCardRenderer } from '@/lib/test-utils';

import PostHeader from '../PostHeader';

const { data, content } = matter(postMD);

const post = computePostField({
  fields: ['slug', 'title', 'category', 'tags', 'date', 'description', 'content'],
  data,
  content,
  slug: 'post1',
  category: 'example',
});

export default {
  title: '포스트/포스트 헤더',

  component: PostHeader,

  decorators: [
    (Story: FC) => {
      return (
        <div style={{ width: '800px' }}>
          <Story />
        </div>
      );
    },
  ],

  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },

  args: {
    ...post,
    minPerRead: 10,
  },
} as Meta;

type Story = StoryObj<typeof PostHeader>;

export const Default: Story = {
  name: '포스트 헤더',

  decorators: [
    (Story) => {
      return (
        <RowPostCardRenderer rowMode={false}>
          <Story />
        </RowPostCardRenderer>
      );
    },
  ],
};

export const Darkmode: Story = {
  name: '포스트 헤더 (다크 모드)',

  decorators: [
    (Story) => {
      return (
        <DarkmodeRenderer>
          <RowPostCardRenderer rowMode={false}>
            <Story />
          </RowPostCardRenderer>
        </DarkmodeRenderer>
      );
    },
  ],
};
