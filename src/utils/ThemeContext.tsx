import React, { createContext, useContext, useState } from 'react';

type Theme = {
  primary: string;
  secondary: string;
  background: string;
  text: string;
};

const themes = {
  dark: {
    primary: '#000000',
    secondary: '#1a1a1a',
    reverseBg: 'bg-[#3332]',
    background: 'bg-[#121212]',
    navBackground: 'bg-[#07070774]',
    text: 'text-white'
  },
  light: {
    primary: '#ffffff',
    secondary: '#f5f5f5',
    reverseBg: 'bg-[#f1f1f1d5]',
    background: 'bg-[#f1f1f1d5]',
    navBackground: 'bg-[#e4e3e929]',
    text: 'text-black'
  }
};

type ThemeContextType = {
  theme: Theme;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState(window.localStorage.getItem('theme')?window.localStorage.getItem('theme'):'dark');

  const value = {
    theme: themes[currentTheme as keyof typeof themes],
    currentTheme,
    setCurrentTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};