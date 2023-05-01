import classNames from 'classnames';
import { useCallback, useState } from 'react';

import { ReactComponent as Pencil } from '../../assets/pencil.svg';
import { ReactComponent as Trash } from '../../assets/trash.svg';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { actions as todoActions } from '../../store/actions/todosActions';
import './Todo.scss';
import { ITodo } from '../../types/Todo';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';

type PropTypes = {
  todo: ITodo;
};

export const Todo: React.FC<PropTypes> = ({ todo }) => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useAppDispatch();

  const {
    finishAt, createdAt, title, id, completed,
  } = todo;

  const handleToggleTodo = (currentId: number) => () => {
    dispatch(todoActions.toggleTodo(currentId));
  };

  const handleDeleteTodo = (currentId: number) => () => {
    dispatch(todoActions.deleteTodo(currentId));
  };

  const handleOpenForm = () => {
    setIsActive(true);
  };

  const handleCloseForm = useCallback(() => {
    setIsActive(false);
  }, []);

  return (
    <>
      <li className={classNames('todo', { completed })}>
        <div className="todo__content">
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
          <div className="todo__buttons-box">
            <button
              type="button"
              className="todo__button"
              onClick={handleOpenForm}
            >
              <Pencil className="todo__svg" />
            </button>
            <button
              type="button"
              className="todo__button"
              onClick={handleDeleteTodo(id)}
            >
              <Trash className="todo__svg" />
            </button>
          </div>
        </div>
        <div className="todo__date-box">
          <p className={classNames('todo__date', { completed })}>
            {`Created at: ${createdAt}`}
          </p>
          <p className={classNames('todo__date', { completed })}>
            {`Should be done untill: ${finishAt}`}
          </p>
        </div>
      </li>
      {isActive && (
        <Modal isActive={isActive} setIsActive={setIsActive}>
          <TodoForm onClose={handleCloseForm} selectedTodo={todo} />
        </Modal>
      )}
    </>
  );
};
