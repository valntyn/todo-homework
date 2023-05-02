import React from 'react';

import './App.scss';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { TodoMain } from './components/TodoMain';
import { Wrapper } from './components/Wrapper';
import { useAppSelector } from './hooks/useAppSelector';

export const App: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);

  return (
    <Wrapper>
      <TodoHeader />
      <TodoMain />
      {!!todos.length && <TodoFooter />}
    </Wrapper>
  );
};
