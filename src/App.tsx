import React, { useEffect } from 'react';

import './App.scss';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { TodoMain } from './components/TodoMain';
import { Wrapper } from './components/Wrapper';
import { useTheme } from './context/ThemeContext';

export const App: React.FC = () => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Wrapper>
      <TodoHeader />
      <TodoMain />
      <TodoFooter />
    </Wrapper>
  );
};
