import React, {
  useContext,
  createContext,
  ReactNode,
  useState,
} from 'react';

export type Theme = 'light' | 'dark';

type ThemeContexT = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContexT>({
  theme: 'light',
  setTheme: () => {},
  isDark: false,
});

type PropsTypes = {
  children?: ReactNode
};

export const ThemeContextProvider: React.FC<PropsTypes> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme),
  );

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{
      setTheme,
      theme,
      isDark,
    }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
