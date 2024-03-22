import { PropsWithChildren, useEffect } from 'react';

import { usePostView } from '@/hooks/usePostView';
import { useTheme } from '@/hooks/useTheme';

export const DarkmodeRenderer = ({ children }: PropsWithChildren) => {
  const { toggleTheme } = useTheme();

  useEffect(() => {
    toggleTheme();
  }, []);

  return <>{children}</>;
};

interface RowPostCardRendererProps extends PropsWithChildren {
  rowMode: boolean;
}

export const RowPostCardRenderer = ({ children, rowMode }: RowPostCardRendererProps) => {
  const { changePostView } = usePostView();

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
