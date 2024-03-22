import { userEvent } from '@storybook/testing-library';
import { render } from '@testing-library/react';
import { RenderOptions } from '@testing-library/react';
import { ReactNode } from 'react';

import { ModalContextProvider } from '@/hooks/useModal';
import { PostViewProvider } from '@/hooks/usePostView';
import { ThemeContextProvider } from '@/hooks/useTheme';

export const renderer = async (component: ReactNode, options: RenderOptions = {}) => {
  const user = userEvent.setup();

  return {
    user,
    ...render(
      <ThemeContextProvider>
        <ModalContextProvider>
          <PostViewProvider>{component}</PostViewProvider>
          <div id="modal" />
        </ModalContextProvider>
      </ThemeContextProvider>,
      options,
    ),
  };
};
