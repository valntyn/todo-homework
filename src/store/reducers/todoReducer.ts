import { ITodo } from '../../types/Todo';
import {
  AddTodoAction,
  DeleteTodoAction,
  ToggleTodoAction,
} from '../actions/todosActions';

type TodoState = {
  todos: ITodo[] | [];
};

const initialState: TodoState = {
  todos: [],
};

type Action = AddTodoAction | ToggleTodoAction | DeleteTodoAction;

const todoReducer = (state = initialState, action: Action): TodoState => {
  switch (action.type) {
    case 'todo/add':
      return {
        ...state,
        todos: [action.payload, ...state.todos],
      };

    case 'todo/toggle':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id !== action.payload) {
            return todo;
          }

          return {
            ...todo,
            completed: !todo.completed,
          };
        }),
      };

    case 'todo/delete':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    default:
      return state;
  }
};

export default todoReducer;
