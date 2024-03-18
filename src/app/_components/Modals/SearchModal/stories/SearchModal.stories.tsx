import type { Meta, StoryObj } from '@storybook/react';
import { FC, useEffect } from 'react';

import { useModal } from '@/hooks/useModal';
import { DarkmodeRenderer } from '@/lib/storybook-utils';

import { posts } from '../mocks/posts';
import SearchModal from '../SearchModal';

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
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '100px',
            backgroundColor: 'beige',
          }}
        >
          <div id="modal" />
          <button style={{ border: '1px solid black' }} onClick={toggleModal}>
            Modal Open
          </button>
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
