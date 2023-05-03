import { createSelector } from 'reselect';

import { RootState } from '../store';

const selectTodos = (state: RootState) => state.todos.todos;

export const selectActiveCount = createSelector(
  selectTodos,
  (todos) => todos.filter((todo) => !todo.completed).length,
);

export const selectCompletedCount = createSelector(
  selectTodos,
  (todos) => todos.filter((todo) => todo.completed).length,
);
