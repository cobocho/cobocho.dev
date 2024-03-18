import postMD from '@posts/example/post/post.md';
import thumbnail from '@posts/example/post/thumbnail.png';
import postMD2 from '@posts/example/post2/post2.md';
import thumbnail2 from '@posts/example/post2/thumbnail2.png';
import type { Meta, StoryObj } from '@storybook/react';
import matter from 'gray-matter';
import { FC } from 'react';

import { computePostField } from '@/lib/api';
import { DarkmodeRenderer, RowPostCardRenderer } from '@/lib/storybook-utils';

import PostList from '../PostList';

const { data: data1, content: content1 } = matter(postMD);
const { data: data2, content: content2 } = matter(postMD2);

const post1 = computePostField({
  fields: ['slug', 'title', 'category', 'tags', 'date', 'description'],
  data: data1,
  content: content1,
  slug: 'post1',
  category: 'example',
});

post1.thumbnail = thumbnail;

const post2 = computePostField({
  fields: ['slug', 'title', 'category', 'tags', 'date', 'description', 'content'],
  data: data2,
  content: content2,
  slug: 'post1',
  category: 'example',
});

post2.thumbnail = thumbnail2;

const POSTS = [post1, post2];

export default {
  title: '포스트/포스트 리스트',

  component: PostList,

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
    title: '타이틀',
    description: '설명',
    posts: POSTS,
  },
} as Meta;

type Story = StoryObj<typeof PostList>;

export const Default: Story = {
  name: '포스트 리스트',

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
