import { ThemeContextProvider, useThemeToggle } from '@/hooks/useThemeToggle';
import { PropsWithChildren } from 'react';

export const DarkmodeRenderer = ({ children }: PropsWithChildren) => {
  const { toggleTheme } = useThemeToggle();
  toggleTheme();

  return <>{children}</>;
};
