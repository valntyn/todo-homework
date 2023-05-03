import { useSelector } from 'react-redux';

import { selectFilteredTodos } from '../../store/selectors/selectFilteredTodos';
import { Todo } from '../Todo';

import './TodoList.scss';

type PropTypes = {
  setNotification: (notification: string) => void
};

export const TodoList: React.FC<PropTypes> = ({ setNotification }) => {
  const todos = useSelector(selectFilteredTodos);

  if (!todos.length) {
    return <p className="todolist__empty">There is nothing left</p>;
  }

  return (
    <ul className="todolist">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} setNotification={setNotification} />
      ))}
    </ul>
  );
};
