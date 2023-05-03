import React from 'react';

import './App.scss';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { TodoMain } from './components/TodoMain';
import { Wrapper } from './components/Wrapper';

export const App: React.FC = () => {
  return (
    <Wrapper>
      <TodoHeader />
      <TodoMain />
      <TodoFooter />
    </Wrapper>
  );
};
