import { useThemeToggle } from '@/hooks/useThemeToggle';
import { PropsWithChildren, useEffect } from 'react';

export const DarkmodeRenderer = ({ children }: PropsWithChildren) => {
  const { toggleTheme } = useThemeToggle();
  toggleTheme();

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
