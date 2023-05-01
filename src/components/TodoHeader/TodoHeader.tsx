import './TodoHeader.scss';

import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { ReactComponent as Plus } from '../../assets/plus.svg';
import { TODO_REGEX } from '../../constants';
import { capitalize } from '../../helpers/capitalize';
import { dateByDefault } from '../../helpers/dateConfigure';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { actions as queryActions } from '../../store/actions/queryAction';
import { actions as todoActions } from '../../store/actions/todosActions';
import { ErrorMessage } from '../../types/ErrorMessage';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';

export const TodoHeader = () => {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState(ErrorMessage.NONE);
  const dispatch = useAppDispatch();

  const { query } = useAppSelector(state => state.query);

  useEffect(() => {
    const timeoutId
      = error && setTimeout(() => setError(ErrorMessage.NONE), 1000);

    return () => clearTimeout(timeoutId);
  }, [error]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      setError(ErrorMessage.TITLE);

      return;
    }

    if (!TODO_REGEX.test(query) && query) {
      setError(ErrorMessage.INCORRECT);

      return;
    }

    const fixedTitle = capitalize(query).trim();

    const newTodo = {
      id: +new Date(),
      title: fixedTitle,
      completed: false,
      createdAt: dateByDefault(),
      finishAt: dateByDefault(1),
    };

    dispatch(queryActions.setQuery(''));
    dispatch(todoActions.addTodo(newTodo));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(ErrorMessage.NONE);
    dispatch(queryActions.setQuery(e.target.value));
  };

  const handleInputDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleOpenForm = () => {
    setIsActive(true);
  };

  const handleCloseForm = useCallback(() => {
    setIsActive(false);
  }, []);

  return (
    <header className="header">
      <form className="header__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="header__new-todo"
          placeholder="Write something to add"
          value={query}
          onChange={handleInput}
          onKeyDown={handleInputDown}
        />
        {error && <p className="header__error">{error}</p>}
        <div className="header__plus">
          <Plus onClick={handleOpenForm} />
        </div>
      </form>
      {isActive && (
        <Modal isActive={isActive} setIsActive={setIsActive}>
          <TodoForm onClose={handleCloseForm} />
        </Modal>
      )}
    </header>
  );
};
