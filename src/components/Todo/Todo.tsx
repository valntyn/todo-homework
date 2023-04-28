import classNames from 'classnames';

import './Todo.scss';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { actions as todoActions } from '../../store/actions/todosActions';

type PropTypes = {
  title: string;
  createdAt: string | Date;
  finishAt: string | Date;
  completed: boolean;
  id: number;
};

export const Todo: React.FC<PropTypes> = ({
  title,
  createdAt,
  finishAt,
  id,
  completed,
}) => {
  const dispatch = useAppDispatch();

  const handleToggleTodo = (currentId: number) => () => {
    dispatch(todoActions.toggleTodo(currentId));
  };

  return (
    <li className={classNames(
      'todo',
      {
        completed,
      },
    )}
    >
      <label className="todo__status-label" htmlFor={`${id}`}>
        <input
          id={`${id}`}
          type="checkbox"
          className="todo__status"
          onChange={handleToggleTodo(id)}
          checked={completed}
        />
      </label>

      <span className="todo__title">{title}</span>
      <div className="todo__date-box">
        <p className={classNames('todo__date', { completed })}>
          {`Created at: ${createdAt}`}
        </p>
        <p className={classNames('todo__date', { completed })}>
          {`Should be done untill: ${finishAt}`}
        </p>
      </div>
    </li>
  );
};
