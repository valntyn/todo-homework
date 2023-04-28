import {
  FormEvent, memo, useCallback, useEffect, useState,
} from 'react';

import { TODO_REGEX } from '../../constants';
import { capitalize } from '../../helpers/capitalize';
import { getDateForm, getDateForInput } from '../../helpers/dateConfigure';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { actions as modalActions } from '../../store/actions/modalActions';
import { actions as queryAction } from '../../store/actions/queryAction';
import { actions as todoActions } from '../../store/actions/todosActions';
import './TodoForm.scss';
import { ErrorMessage } from '../../types/ErrorMessage';
import { InputChange } from '../../types/InputChange';
import { InputField } from '../InputField';

export const TodoForm = memo(() => {
  const [dateStart, setDateStart] = useState<string | Date>('');
  const [dateFinish, setDateFinish] = useState<string | Date>('');
  const [error, setError] = useState(ErrorMessage.NONE);
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

  useEffect(() => {
    const timeoutId = error
    && setTimeout(() => setError(ErrorMessage.NONE), 1000);

    return () => clearTimeout(timeoutId);
  }, [error]);

  const handleDateTimeChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
    type: InputChange,
  ) => {
    switch (type) {
      case InputChange.TITLE:
        dispatch(queryAction.setQuery(e.target.value));
        break;

      case InputChange.START:
        setDateStart(e.target.value);
        break;

      case InputChange.FINISH:
        setDateFinish(e.target.value);
        break;

      default:
        break;
    }
  }, [dispatch, dateFinish, dateStart]);

  const canSave = () => [query.trim(), dateFinish, dateStart].every(Boolean);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    const fixedTitle = capitalize(query).trim();
    const fixedStartDate = getDateForm(new Date(dateStart));
    const fixedFinishDate = getDateForm(new Date(dateFinish));

    if (!TODO_REGEX.test(query) && query) {
      setError(ErrorMessage.INCORRECT);

      return;
    }

    if (!canSave()) {
      setError(ErrorMessage.EMPTY);

      return;
    }

    if (+new Date(dateStart) > +new Date(dateFinish)) {
      setError(ErrorMessage.DATE_GREATER);

      return;
    }

    if (new Date(dateStart).getFullYear() < new Date().getFullYear()) {
      setError(ErrorMessage.INCORRECT_DATE);

      return;
    }

    if (
      fixedFinishDate === 'Invalid Date'
      || fixedStartDate === 'Invalid Date'
    ) {
      setError(ErrorMessage.INCORRECT_DATE);

      return;
    }

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
    dispatch(modalActions.setIsActive(false));
  };

  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <h1 className="form__title">Here, you can add additional information</h1>
      <InputField
        text="Fill the title for your todo"
        values={query}
        placeholder="Write something to add"
        type="text"
        handleChange={(e) => handleDateTimeChange(e, InputChange.TITLE)}
        id="title"
      />
      <InputField
        text="Select the start date and time of your todo:"
        type="datetime-local"
        handleChange={(e) => handleDateTimeChange(e, InputChange.START)}
        values={dateStart}
        id="dateStart"
      />
      <InputField
        text="Select date and time when you will finish your todo:"
        type="datetime-local"
        handleChange={(e) => handleDateTimeChange(e, InputChange.FINISH)}
        min={getDateForInput(date)}
        values={dateFinish}
        id="dateFinish"
      />
      <div className="form__box-button">
        <button type="button" className="form__button" onClick={hanldeClose}>
          cancel
        </button>
        <button type="submit" className="form__button">
          save
        </button>
      </div>
      {error && <p className="form__error">{error}</p>}
    </form>
  );
});
