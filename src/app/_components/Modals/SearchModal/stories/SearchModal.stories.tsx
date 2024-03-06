import type { Meta, StoryObj } from '@storybook/react';
import { FC, useEffect } from 'react';

import { useModal } from '@/hooks/useModal';
import { DarkmodeRenderer } from '@/lib/test-utils';

import SearchModal from '../SearchModal';

const posts = [
  {
    title: 'title1',
    category: 'category1',
    slug: 'title1',
  },
  {
    title: 'title2',
    category: 'category2',
    slug: 'title2',
  },
  {
    title: 'title3',
    category: 'category3',
    slug: 'title3',
  },
];

export default {
  title: '모달/검색 모달',

  component: SearchModal,

  decorators: [
    (Story: FC) => {
      const { toggleModal } = useModal();

      useEffect(() => {
        toggleModal();
      }, []);

      return (
        <>
          <div id="modal" />
          <Story />
        </>
      );
    },
  ],

  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },

  args: {
    posts,
  },
} as Meta;

type Story = StoryObj<typeof SearchModal>;

export const Default: Story = {
  name: '검색 모달',

  decorators: [
    (Story) => {
      return <Story />;
    },
  ],
};

export const Darkmode: Story = {
  name: '검색 모달 (다크 모드)',

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
