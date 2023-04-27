import { createStore, combineReducers } from 'redux';

import isActiveReducer from '../features/modal/itActive';
import queryReducer from '../features/todos/query';
import todoReducer from '../features/todos/todos';

const rootReducer = combineReducers({
  todos: todoReducer,
  isActive: isActiveReducer,
  query: queryReducer,
});

export const store = createStore(
  rootReducer,
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
