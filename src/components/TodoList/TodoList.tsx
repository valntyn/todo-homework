import classNames from 'classnames';
import { useSelector } from 'react-redux';

import { useTheme } from '../../context/ThemeContext';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectFilteredTodos } from '../../store/selectors/selectFilteredTodos';
import { Todo } from '../Todo';

import './TodoList.scss';

type PropTypes = {
  setNotification: (notification: string) => void;
};

export const TodoList: React.FC<PropTypes> = ({ setNotification }) => {
  const todos = useSelector(selectFilteredTodos);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { search } = useAppSelector((state) => state.search);

  if (!todos.length && search) {
    return (
      <p
        className={classNames('todolist__empty', {
          'todolist__empty--dark': isDark,
        })}
      >
        No results found
      </p>
    );
  }

  if (!todos.length) {
    return (
      <p
        className={classNames('todolist__empty', {
          'todolist__empty--dark': isDark,
        })}
      >
        There is nothing left
      </p>
    );
  }

  return (
    <ul className="todolist">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} setNotification={setNotification} />
      ))}
    </ul>
  );
};
