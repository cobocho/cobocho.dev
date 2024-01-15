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
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      localStorage.setItem('dark_mode', '0');

      return (
        <ThemeContextProvider>
          <Story />
        </ThemeContextProvider>
      );
    },
  ],
};

export default preview;
