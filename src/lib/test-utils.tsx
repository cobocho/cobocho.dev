import { userEvent } from '@storybook/testing-library';
import { render } from '@testing-library/react';
import { RenderOptions } from '@testing-library/react';
import { PropsWithChildren, ReactNode, useEffect } from 'react';

import { ModalContextProvider } from '@/hooks/useModal';
import { PostViewContextProvider, usePostViewContext } from '@/hooks/usePostViewContext';
import { ThemeContextProvider, useThemeToggle } from '@/hooks/useThemeToggle';

export const DarkmodeRenderer = ({ children }: PropsWithChildren) => {
  const { toggleTheme } = useThemeToggle();

  useEffect(() => {
    toggleTheme();
  }, []);

  return <>{children}</>;
};

interface RowPostCardRendererProps extends PropsWithChildren {
  rowMode: boolean;
}

export const RowPostCardRenderer = ({ children, rowMode }: RowPostCardRendererProps) => {
  const { changePostView } = usePostViewContext();

  useEffect(() => {
    if (rowMode) {
      changePostView(1);
    } else {
      changePostView(2);
    }
  }, []);

  return <>{children}</>;
};

export const DeviceWidthRenderer = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const defaultPadding = document.getElementById('default-padding')!;
    defaultPadding.style.padding = '0px';
  }, []);

  return (
    <div
      style={{
        height: '2000px',
      }}
    >
      {children}
    </div>
  );
};

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
