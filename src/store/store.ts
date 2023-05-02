import { createStore, combineReducers } from 'redux';

import filterReducer from './reducers/filterReducer';
import todoReducer from './reducers/todoReducer';

const rootReducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
});

export const store = createStore(
  rootReducer,
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
