import type { Preview } from '@storybook/react';
import { ThemeContextProvider } from '../src/hooks/useThemeToggle';
import { ModalContextProvider } from '../src/hooks/useModal';
import { PostViewContextProvider } from '../src/hooks/usePostViewContext';
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
            <PostViewContextProvider>
              <div
                id="default-padding"
                style={{
                  padding: '16px',
                }}
              >
                <Story />
              </div>
            </PostViewContextProvider>
          </ModalContextProvider>
        </ThemeContextProvider>
      );
    },
  ],
};

export default preview;
