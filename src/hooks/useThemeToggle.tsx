import { wrapper } from '@/styles/global.css';
import { LightTheme, DarkTheme } from '@/styles/theme.css';
import { darkTheme, lightTheme } from '@/styles/themeStyles';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

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

  useEffect(() => {
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
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <div className={isDarkTheme ? DarkTheme : LightTheme}>
          <div className={wrapper}>{children}</div>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeToggle = () => {
  return useContext(ThemeContext);
};
