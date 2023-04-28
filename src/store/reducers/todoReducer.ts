import { ITodo } from '../../types/Todo';
import { AddTodoAction, ToggleTodoAction } from '../actions/todosActions';

type TodoState = {
  todos: ITodo[] | [];
};

const initialState: TodoState = {
  todos: [],
};

type Action = AddTodoAction | ToggleTodoAction;

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
    default:
      return state;
  }
};

export default todoReducer;
