import { createContext, ReactNode, useEffect, useState } from 'react';

type ThemeType = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeContext = createContext<ThemeContextType>(
  {} as ThemeContextType
);
const isPreferringDark = window.matchMedia('(prefers-color-scheme: dark)');

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeType>();

  const toggleTheme = () => {
    const storageTheme = localStorage.getItem('theme');

    if (
      storageTheme === 'dark' ||
      (!('theme' in localStorage) && isPreferringDark.matches)
    ) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  const applyTheme = () => {
    const storageTheme = localStorage.getItem('theme');

    if (
      storageTheme === 'dark' ||
      (!('theme' in localStorage) && isPreferringDark.matches)
    ) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  };

  useEffect(() => {
    applyTheme();

    isPreferringDark.addEventListener('change', applyTheme);

    return () => {
      isPreferringDark.removeEventListener('change', applyTheme);
    };
  }, []);

  if (theme) {
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  } else {
    return <div />;
  }
}
