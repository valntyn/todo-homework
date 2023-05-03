import { combineReducers } from 'redux';

import filterReducer from './filterReducer';
import searchReducer from './searchReducer';
import todoReducer from './todoReducer';

const rootReducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
  search: searchReducer,
});

export default rootReducer;
