import './TodoHeader.scss';

import classNames from 'classnames';
import {
  FormEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { ReactComponent as Moon } from '../../assets/moon.svg';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { TODO_REGEX } from '../../constants';
import { useTheme } from '../../context/ThemeContext';
import { capitalize } from '../../helpers/capitalize';
import { formatDate } from '../../helpers/dateConfigure';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { actions as filterAction } from '../../store/actions/filterAction';
import { actions as todoActions } from '../../store/actions/todosActions';
import { ErrorMessage } from '../../types/ErrorMessage';
import { Filter } from '../../types/Filter';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm';

export const TodoHeader = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(ErrorMessage.NONE);
  const dispatch = useAppDispatch();

  const { setTheme, isDark, theme } = useTheme();

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
      createdAt: formatDate(),
      finishAt: formatDate(new Date(), 1),
    };

    setQuery('');
    dispatch(todoActions.addTodo(newTodo));
    dispatch(filterAction.setFilter(Filter.ALL));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(ErrorMessage.NONE);
    setQuery(e.target.value);
  };

  const handleInputDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleOpenForm = () => {
    setIsModalActive(true);
  };

  const handleCloseForm = useCallback(() => {
    setIsModalActive(false);
  }, []);

  const handleChangeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <header
      className={classNames('header', {
        'header--dark': isDark,
      })}
    >
      <button
        type="button"
        className="header__switcher"
        onClick={handleChangeTheme}
      >
        <Moon
          className={classNames('header__svg', {
            'header__svg--dark': isDark,
          })}
        />
      </button>
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
        <button
          type="button"
          className="header__button"
          onClick={handleOpenForm}
        >
          <Plus className="header__svg" />
        </button>
      </form>
      {isModalActive && (
        <Modal
          isModalActive={isModalActive}
          setIsModalActive={setIsModalActive}
        >
          <TodoForm
            onClose={handleCloseForm}
            queryFromHeader={query}
            setQuery={setQuery}
          />
        </Modal>
      )}
    </header>
  );
};
