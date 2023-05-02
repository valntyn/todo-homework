import { createSelector } from 'reselect';

import { Filter } from '../../types/Filter';
import { ITodo } from '../../types/Todo';
import { RootState } from '../store';

const selectAllTodos = (state: RootState) => state.todos.todos;
const selectFilter = (state: RootState) => state.filter.filter;

export const selectFilteredTodos = createSelector(
  [selectAllTodos, selectFilter],
  (todos: ITodo[], filter: Filter) => {
    switch (filter) {
      case Filter.ALL:
        return todos;
      case Filter.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      case Filter.COMPLETED:
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  },
);
