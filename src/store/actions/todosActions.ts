import { ITodo } from '../../types/Todo';

export type AddTodoAction = {
  type: 'todo/add';
  payload: ITodo;
};

const addTodo = (todo: ITodo): AddTodoAction => ({
  type: 'todo/add',
  payload: todo,
});

export type ToggleTodoAction = {
  type: 'todo/toggle';
  payload: number;
};

const toggleTodo = (id: number): ToggleTodoAction => ({
  type: 'todo/toggle',
  payload: id,
});

export const actions = { addTodo, toggleTodo };
