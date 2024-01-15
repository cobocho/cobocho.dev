import { useThemeToggle } from '@/hooks/useThemeToggle';
import { FC, PropsWithChildren } from 'react';

export const ToggleRenderer = (Component: FC) => {
  const { toggleTheme } = useThemeToggle();
  toggleTheme();

  return <Component />;
};
