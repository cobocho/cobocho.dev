import image from '@posts/example/post/images/1.png';
import postMD from '@posts/example/post/post.md';
import thumbnail from '@posts/example/post/thumbnail.png';
import type { Meta, StoryObj } from '@storybook/react';
import matter from 'gray-matter';
import { FC } from 'react';

import { computePostField } from '@/lib/api';
import { DarkmodeRenderer } from '@/lib/storybook-utils';

import { postContainer, postLayout, tocSection } from '../../../layout.css';
import TOC from '../../TOC/TOC';
import PostContent from '../PostContent';

const { data, content } = matter(postMD);

const post = computePostField({
  fields: ['slug', 'title', 'category', 'content', 'tags', 'date', 'description'],
  data,
  content,
  slug: 'post1',
  category: 'example',
});

post.thumbnail = thumbnail;

post.images = {
  '1.png': image,
};

export default {
  title: '포스트/포스트 콘텐츠',

  component: PostContent,

  decorators: [
    (Story: FC) => {
      return (
        <div style={{ width: '1600px', paddingLeft: '300px' }}>
          <div style={{ width: '900px' }}>
            <section className={postLayout}>
              <article className={postContainer}>
                <Story />
              </article>
              <div className={tocSection}>
                <TOC />
              </div>
            </section>
          </div>{' '}
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
    post,
    children: post.content,
  },
} as Meta;

type Story = StoryObj<typeof PostContent>;

export const Default: Story = {
  name: '포스트 콘텐츠',

  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
};

export const Darkmode: Story = {
  name: '포스트 콘텐츠 (다크 모드)',

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
