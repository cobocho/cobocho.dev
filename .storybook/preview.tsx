import type { Preview } from '@storybook/react';
import { ThemeContextProvider } from '../src/hooks/useThemeToggle';
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
          <div
            id="default-padding"
            style={{
              padding: '16px',
            }}
          >
            <Story />
          </div>
        </ThemeContextProvider>
      );
    },
  ],
};

export default preview;
