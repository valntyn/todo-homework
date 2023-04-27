import {
  ChangeEvent, FormEvent, memo, useEffect, useState,
} from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TODO_REGEX } from '../../constants';
import { actions as modalActions } from '../../features/modal/itActive';
import { actions as queryAction } from '../../features/todos/query';
import { actions as todoActions } from '../../features/todos/todos';
import { capitalize } from '../../helpers/capitalize';
import { getDateForm, getDateForInput } from '../../helpers/dateConfigure';

import './TodoForm.scss';
import { InputField } from '../InputField';

export const TodoForm = memo(() => {
  const [dateStart, setDateStart] = useState<string | Date>('');
  const [dateFinish, setDateFinish] = useState<string | Date>('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const date = new Date();

  const { query } = useAppSelector((state) => state.query);
  const { isActive } = useAppSelector((state) => state.isActive);

  useEffect(() => {
    const tomorrowDate = new Date(date);

    tomorrowDate.setDate(date.getDate() + 1);

    setDateStart(getDateForInput(date));
    setDateFinish(getDateForInput(tomorrowDate));
  }, [isActive]);

  const handleDateTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    setError('');

    switch (type) {
      case 'title':
        dispatch(queryAction.setQuery(e.target.value));
        break;

      case 'start':
        setDateStart(e.target.value);
        break;

      case 'finish':
        setDateFinish(e.target.value);
        break;

      default:
        break;
    }
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
    const fixedStartDate = getDateForm(new Date(dateStart));
    const fixedFinishDate = getDateForm(new Date(dateFinish));

    const newTodo = {
      id: +new Date(),
      title: fixedTitle,
      completed: false,
      createdAt: fixedStartDate,
      finishAt: fixedFinishDate,
    };

    dispatch(queryAction.setQuery(''));
    dispatch(todoActions.addTodo(newTodo));
    dispatch(modalActions.setIsActive(false));
  };

  const hanldeClose = () => {
    setError('');
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
        handleChange={(e) => handleDateTimeChange(e, 'title')}
        id="title"
      />
      <InputField
        text="Select date and time when you will start:"
        type="datetime-local"
        handleChange={(e) => handleDateTimeChange(e, 'start')}
        min={getDateForInput(date)}
        values={dateStart}
        id="dateStart"
      />
      <InputField
        text="Select date and time when you will finish:"
        type="datetime-local"
        handleChange={(e: ChangeEvent<HTMLInputElement>) => handleDateTimeChange(e, 'finish')}
        min={getDateForInput(date)}
        values={dateFinish}
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
