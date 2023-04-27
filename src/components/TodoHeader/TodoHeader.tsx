import './TodoHeader.scss';

import { FormEvent, KeyboardEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { TODO_REGEX } from '../../constants';
import { actions as modalActions } from '../../features/modal/itActive';
import { actions as queryActions } from '../../features/todos/query';
import { actions as todoActions } from '../../features/todos/todos';
import { capitalize } from '../../helpers/capitalize';
import { dateByDefault } from '../../helpers/dateConfigure';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm/TodoForm';

export const TodoHeader = () => {
  const [error, setError] = useState('');
  const { query } = useAppSelector(state => state.query);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!query) {
      setError('Field should be filled');

      return;
    }

    if (!TODO_REGEX.test(query) && query) {
      setError('Special symbols are not allowed');

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

    dispatch(todoActions.addTodo(newTodo));
    dispatch(queryActions.setQuery(''));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    dispatch(queryActions.setQuery(e.target.value));
  };

  const handleInputDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const handleOpenForm = () => {
    dispatch(modalActions.setIsActive(true));
  };

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
      <Modal>
        <TodoForm />
      </Modal>
    </header>
  );
};
