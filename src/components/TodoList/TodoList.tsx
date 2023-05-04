import { useSelector } from 'react-redux';

import { useAppSelector } from '../../hooks/useAppSelector';
import { selectFilteredTodos } from '../../store/selectors/selectFilteredTodos';
import { Todo } from '../Todo';

import './TodoList.scss';

type PropTypes = {
  setNotification: (notification: string) => void
};

export const TodoList: React.FC<PropTypes> = ({ setNotification }) => {
  const todos = useSelector(selectFilteredTodos);

  const { search } = useAppSelector(state => state.search);

  if (!todos.length && search) {
    return <p className="todolist__empty">No results found</p>;
  }

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
