import React, {
  useContext,
  createContext,
  ReactNode,
  useState,
} from 'react';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

type ThemeContexT = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeContexT>({
  theme: Theme.Light,
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

  const isDark = theme === Theme.Dark;

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
