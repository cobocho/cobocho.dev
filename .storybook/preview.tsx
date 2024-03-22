import type { Preview } from '@storybook/react';
import { ThemeContextProvider } from '../src/hooks/useTheme';
import { ModalContextProvider } from '../src/hooks/useModal';
import { PostViewProvider } from '../src/hooks/usePostView';
import React from 'react';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },

  decorators: [
    (Story) => {
      localStorage.setItem('dark_mode', '0');

      return (
        <ThemeContextProvider>
          <ModalContextProvider>
            <PostViewProvider>
              <div
                id="default-padding"
                style={{
                  padding: '16px',
                }}
              >
                <Story />
              </div>
            </PostViewProvider>
          </ModalContextProvider>
        </ThemeContextProvider>
      );
    },
  ],
};

export default preview;
