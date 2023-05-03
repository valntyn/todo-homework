import { combineReducers } from 'redux';

import filterReducer from './filterReducer';
import todoReducer from './todoReducer';

const rootReducer = combineReducers({
  todos: todoReducer,
  filter: filterReducer,
});

export default rootReducer;
