import './TodoHeader.scss';

import { FormEvent, KeyboardEvent, useState } from 'react';

import { ReactComponent as Plus } from '../../assets/plus.svg';
import { TODO_REGEX } from '../../constants';
import { capitalize } from '../../helpers/capitalize';
import { dateByDefault } from '../../helpers/dateConfigure';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { actions as modalActions } from '../../store/actions/modalActions';
import { actions as queryActions } from '../../store/actions/queryAction';
import { actions as todoActions } from '../../store/actions/todosActions';
import { Modal } from '../Modal';
import { TodoForm } from '../TodoForm/TodoForm';

export const TodoHeader = () => {
  const [error, setError] = useState('');
  const { query } = useAppSelector((state) => state.query);
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!query.trim()) {
      setError('Field should be filled');

      return;
    }

    if (!TODO_REGEX.test(query) && query) {
      setError('Only ENG letters and ,.!?');

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
