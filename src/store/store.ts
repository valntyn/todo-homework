import { createStore, combineReducers } from 'redux';

import isActiveReducer from './reducers/modalReducer';
import queryReducer from './reducers/queryReducer';
import todoReducer from './reducers/todoReducer';

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
