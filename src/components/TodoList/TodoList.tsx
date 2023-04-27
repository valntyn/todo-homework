import { useAppSelector } from '../../hooks/useAppSelector';
import { Todo } from '../Todo';

import './TodoList.scss';

export const TodoList = () => {
  const { todos } = useAppSelector((state) => state.todos);

  if (!todos.length) {
    return <p className="todolist__empty">There is nothing left</p>;
  }

  return (
    <ul className="todolist">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
