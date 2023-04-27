import { ITodo } from '../../types/Todo';
import { AddTodoAction } from '../actions/todosActions';

type TodoState = {
  todos: ITodo[] | [];
};

const initialState: TodoState = {
  todos: [],
};

type Action = AddTodoAction;

const todoReducer = (state = initialState, action: Action): TodoState => {
  switch (action.type) {
    case 'todo/add':
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };
    default:
      return state;
  }
};

export default todoReducer;
