'use client';

import { createContext, useCallback, useContext, useLayoutEffect, useState } from 'react';

import { pretendard } from '@/app/fonts';
import { wrapper } from '@/styles/global.css';
import { DarkTheme, LightTheme } from '@/styles/theme.css';

interface ThemeContextValues {
  theme: ThemeFlag;
  toggleTheme: VoidFunction;
}

export const ThemeFlag = {
  light: 0,
  dark: 1,
} as const;

export type ThemeFlag = (typeof ThemeFlag)[keyof typeof ThemeFlag];

const ThemeContext = createContext<ThemeContextValues>({} as ThemeContextValues);

interface Props {
  children: React.ReactNode;
}

export const ThemeContextProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<ThemeFlag>(ThemeFlag.light);

  const toggleTheme = useCallback(() => {
    const changedTheme = theme === ThemeFlag.light ? ThemeFlag.dark : ThemeFlag.light;
    setTheme(changedTheme);
    localStorage.setItem('dark_mode', String(changedTheme));
  }, [theme]);

  useLayoutEffect(() => {
    if (localStorage.getItem('dark_mode')) {
      const localTheme = Number(localStorage.getItem('dark_mode')) as ThemeFlag;
      setTheme(localTheme);
    }
  }, []);

  const isDarkTheme = theme === ThemeFlag.dark;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <div className={isDarkTheme ? DarkTheme : LightTheme}>
        <div className={`${wrapper} ${pretendard.className} jha!!!!`}>{children}</div>
      </div>
    </ThemeContext.Provider>
  );
};

export const useThemeToggle = () => {
  return useContext(ThemeContext);
};
