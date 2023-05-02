import { createStore, combineReducers } from 'redux';

import todoReducer from './reducers/todoReducer';

const rootReducer = combineReducers({
  todos: todoReducer,
});

export const store = createStore(
  rootReducer,
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
