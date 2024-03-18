import postMD from '@posts/example/post/post.md';
import thumbnail from '@posts/example/post/thumbnail.png';
import type { Meta, StoryObj } from '@storybook/react';
import matter from 'gray-matter';
import { FC } from 'react';

import { computePostField } from '@/lib/api';
import { DarkmodeRenderer, RowPostCardRenderer } from '@/lib/storybook-utils';

import PostCard from '../PostCard';

const { data, content } = matter(postMD);

const post = computePostField({
  fields: ['slug', 'title', 'category', 'tags', 'date', 'description', 'content'],
  data,
  content,
  slug: 'post1',
  category: 'example',
});

post.thumbnail = thumbnail;

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

  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },

  args: post,
} as Meta;

type Story = StoryObj<typeof PostCard>;

export const Default: Story = {
  name: '포스트 카드',

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
  name: '포스트 카드 (다크 모드)',

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

export const DefaultRow: Story = {
  name: '포스트 카드 (가로보기)',

  decorators: [
    (Story) => {
      return (
        <RowPostCardRenderer rowMode={true}>
          <Story />
        </RowPostCardRenderer>
      );
    },
  ],
};

export const DarkmodeRow: Story = {
  name: '포스트 카드 (가로보기 / 다크 모드)',

  decorators: [
    (Story) => {
      return (
        <DarkmodeRenderer>
          <RowPostCardRenderer rowMode={true}>
            <Story />
          </RowPostCardRenderer>
        </DarkmodeRenderer>
      );
    },
  ],
};
