import { userEvent } from '@storybook/testing-library';
import { render } from '@testing-library/react';
import { RenderOptions } from '@testing-library/react';
import { ReactNode } from 'react';

import { ModalContextProvider } from '@/hooks/useModal';
import { PostViewContextProvider } from '@/hooks/usePostViewContext';
import { ThemeContextProvider } from '@/hooks/useThemeToggle';

export const renderer = async (component: ReactNode, options: RenderOptions = {}) => {
  const user = userEvent.setup();

  return {
    user,
    ...render(
      <ThemeContextProvider>
        <ModalContextProvider>
          <PostViewContextProvider>{component}</PostViewContextProvider>
          <div id="modal" />
        </ModalContextProvider>
      </ThemeContextProvider>,
      options,
    ),
  };
};
