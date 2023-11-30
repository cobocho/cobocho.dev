import React, { createContext, useCallback, useContext, useState } from 'react';

interface ThemeContextValues {
  theme: ThemeFlag;
  toggleTheme: VoidFunction;
  setLocalTheme: VoidFunction;
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

  const setLocalTheme = useCallback(() => {
    if (localStorage.getItem('dark_mode')) {
      const localTheme = Number(localStorage.getItem('dark_mode')) as ThemeFlag;
      setTheme(localTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        setLocalTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeToggle = () => {
  return useContext(ThemeContext);
};
