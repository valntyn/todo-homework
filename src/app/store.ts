import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
});

export const store = createStore(
  rootReducer,
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
