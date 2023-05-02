import { ITodo } from '../../types/Todo';

type AddTodoAction = {
  type: 'todo/add';
  payload: ITodo;
};

const addTodo = (todo: ITodo): AddTodoAction => ({
  type: 'todo/add',
  payload: todo,
});

type ToggleTodoAction = {
  type: 'todo/toggle';
  payload: number;
};

const toggleTodo = (id: number): ToggleTodoAction => ({
  type: 'todo/toggle',
  payload: id,
});

type DeleteTodoAction = {
  type: 'todo/delete';
  payload: number;
};

const deleteTodo = (id: number): DeleteTodoAction => ({
  type: 'todo/delete',
  payload: id,
});

type UpdateTodoAction = {
  type: 'todo/update';
  payload: ITodo;
};

const updateTodo = (todo: ITodo): UpdateTodoAction => ({
  type: 'todo/update',
  payload: todo,
});

export type TodoAction =
  | AddTodoAction
  | ToggleTodoAction
  | DeleteTodoAction
  | UpdateTodoAction;

export const actions = {
  addTodo, toggleTodo, deleteTodo, updateTodo,
};
