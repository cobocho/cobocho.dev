import type { StoryObj } from '@storybook/react';
import { FC } from 'react';

import { DarkmodeRenderer, DeviceWidthRenderer } from '@/lib/test-utils';

import Footer from '../Footer';

export default {
  title: '공통/푸터',

  component: Footer,

  decorators: [
    (Story: FC) => {
      return (
        <DeviceWidthRenderer>
          <Story />
        </DeviceWidthRenderer>
      );
    },
  ],
};

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  name: '라이트 모드',
};

export const Toggle: Story = {
  name: '다크 모드',

  render: () => {
    return (
      <DarkmodeRenderer>
        <DeviceWidthRenderer>
          <Footer />
        </DeviceWidthRenderer>
      </DarkmodeRenderer>
    );
  },
};
