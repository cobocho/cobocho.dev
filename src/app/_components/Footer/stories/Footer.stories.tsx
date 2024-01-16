import type { StoryObj } from '@storybook/react';
import Footer from '../Footer';
import { DarkmodeRenderer } from '@/lib/test-utils';

export default {
  title: '공통/푸터',

  component: () => {
    return <Footer />;
  },
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
        <Footer />
      </DarkmodeRenderer>
    );
  },
};
