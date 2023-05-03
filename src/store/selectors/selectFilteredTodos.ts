import { createSelector } from 'reselect';

import { Filter } from '../../types/Filter';
import { ITodo } from '../../types/Todo';
import { RootState } from '../store';

const selectAllTodos = (state: RootState) => state.todos.todos;
const selectFilter = (state: RootState) => state.filter.filter;
const selectSearch = (state: RootState) => state.search.search;

export const selectFilteredTodos = createSelector(
  [selectAllTodos, selectFilter, selectSearch],
  (todos: ITodo[], filter: Filter, search: string) => {
    let filteredTodos = todos;

    switch (filter) {
      case Filter.ALL:
        break;
      case Filter.ACTIVE:
        filteredTodos = filteredTodos.filter((todo) => !todo.completed);
        break;
      case Filter.COMPLETED:
        filteredTodos = filteredTodos.filter((todo) => todo.completed);
        break;
      default:
        break;
    }

    if (search.trim()) {
      filteredTodos = filteredTodos
        .filter((todo) => todo.title
          .toLowerCase()
          .includes(search.toLowerCase()));
    }

    return filteredTodos;
  },
);
