import { ITodo } from '../../types/Todo';

export type AddTodoAction = {
  type: 'todo/add';
  payload: ITodo;
};

const addTodo = (todo: ITodo): AddTodoAction => ({
  type: 'todo/add',
  payload: todo,
});

export const actions = { addTodo };
