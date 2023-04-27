import { ITodo } from '../../types/Todo';

type TodoState = {
  todos: ITodo[] | [];
};

const initialState: TodoState = {
  todos: [],
};

type AddTodoAction = {
  type: 'todo/add';
  payload: ITodo;
};

const addTodo = (todo: ITodo): AddTodoAction => ({
  type: 'todo/add',
  payload: todo,
});

type Action = AddTodoAction;

export const actions = { addTodo };

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
