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
};

const ThemeContext = createContext<ThemeContexT>({
  theme: 'light',
  setTheme: () => {},
});

type PropsTypes = {
  children?: ReactNode
};

export const ThemeContextProvider: React.FC<PropsTypes> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme),
  );

  return (
    <ThemeContext.Provider value={{
      setTheme,
      theme,
    }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
