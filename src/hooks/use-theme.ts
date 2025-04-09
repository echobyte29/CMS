import { useTheme as useNextTheme } from 'next-themes';

export const useTheme = () => {
  const { theme, setTheme } = useNextTheme();

  return {
    theme: theme as 'light' | 'dark',
    setTheme: (theme: 'light' | 'dark') => setTheme(theme),
    toggleTheme: () => setTheme(theme === 'light' ? 'dark' : 'light'),
  };
}; 