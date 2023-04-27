import { FormEvent, memo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TODO_REGEX } from '../../constants';
import { actions as modalActions } from '../../features/modal/itActive';
import { actions as queryAction } from '../../features/todos/query';
import { actions as todoActions } from '../../features/todos/todos';
import { capitalize } from '../../helpers/capitalize';
import { configureDate, minDate } from '../../helpers/dateConfigure';

import './TodoForm.scss';
import { InputField } from '../InputField';

export const TodoForm = memo(() => {
  const [dateStart, setDateStart] = useState('');
  const [dateFinish, setDateFinish] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();

  const { query } = useAppSelector((state) => state.query);

  const clear = () => {
    setDateStart('');
    setDateFinish('');
    dispatch(queryAction.setQuery(''));
  };

  const handleDateTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    const selectedDateTime = new Date(e.target.value);
    const formattedDateTime = configureDate(selectedDateTime);

    setError('');

    switch (type) {
      case 'start':
        setDateStart(formattedDateTime);
        break;

      case 'finish':
        setDateFinish(formattedDateTime);
        break;

      default:
        break;
    }
  };

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    dispatch(queryAction.setQuery(e.target.value));
  };

  const canSave = [query, dateFinish, dateStart].every(Boolean);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    if (!TODO_REGEX.test(query) && query) {
      setError('Special symbols are not allowed');

      return;
    }

    if (!canSave) {
      setError('Every field should be filled');

      return;
    }

    const fixedTitle = capitalize(query).trim();

    const newTodo = {
      id: +new Date(),
      title: fixedTitle,
      completed: false,
      createdAt: dateStart,
      finishAt: dateFinish,
    };

    clear();
    dispatch(todoActions.addTodo(newTodo));
    dispatch(modalActions.setIsActive(false));
  };

  const hanldeClose = () => {
    setError('');
    clear();
    dispatch(modalActions.setIsActive(false));
  };

  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <h1 className="form__title">Here, you can additional information</h1>
      <InputField
        text="Fill the field for todo"
        values={query}
        placeholder="Write something to add"
        type="text"
        handleChange={handleTitle}
        id="title"
      />
      <InputField
        text="Select date and time when you will start:"
        type="datetime-local"
        handleChange={(e) => handleDateTimeChange(e, 'start')}
        min={minDate}
        id="dateStart"
      />
      <InputField
        text="Select date and time when you will finish:"
        type="datetime-local"
        handleChange={(e) => handleDateTimeChange(e, 'finish')}
        min={minDate}
        id="dateFinish"
      />
      <div className="form__box-button">
        <button type="button" className="form__button" onClick={hanldeClose}>
          CANCEL
        </button>
        <button type="submit" className="form__button">
          SAVE
        </button>
      </div>
      {error && (
        <p className="form__error">
          {error}
        </p>
      )}
    </form>
  );
});
