import {
  FormEvent, memo, useCallback, useEffect, useState,
} from 'react';

import { TODO_REGEX } from '../../constants';
import { capitalize } from '../../helpers/capitalize';
import {
  getDateForm, getDateForInput, convertToDate,
} from '../../helpers/dateConfigure';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { actions as queryActions } from '../../store/actions/queryAction';
import { actions as todoActions } from '../../store/actions/todosActions';
import './TodoForm.scss';
import { ErrorMessage } from '../../types/ErrorMessage';
import { InputChange } from '../../types/InputChange';
import { ITodo } from '../../types/Todo';
import { InputField } from '../InputField';

type PropTypes = {
  onClose: () => void;
  selectedTodo?: ITodo;
};

export const TodoForm: React.FC<PropTypes> = memo(({
  onClose, selectedTodo,
}) => {
  const [value, setValue] = useState('');
  const [dateStart, setDateStart] = useState<string | Date>('');
  const [dateFinish, setDateFinish] = useState<string | Date>('');
  const [error, setError] = useState(ErrorMessage.NONE);

  const dispatch = useAppDispatch();
  const date = new Date();

  const { query } = useAppSelector((state) => state.query);

  useEffect(() => {
    if (selectedTodo) {
      setDateStart(convertToDate(selectedTodo.createdAt));
      setDateFinish(convertToDate(selectedTodo.finishAt));
      setValue(selectedTodo.title);
    } else {
      const tomorrowDate = new Date(date);

      tomorrowDate.setDate(date.getDate() + 1);
      setDateStart(getDateForInput(date));
      setDateFinish(getDateForInput(tomorrowDate));
      setValue(query);
    }
  }, [selectedTodo]);

  useEffect(() => {
    const timeoutId
      = error && setTimeout(() => setError(ErrorMessage.NONE), 1000);

    return () => clearTimeout(timeoutId);
  }, [error]);

  const handleDateTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: InputChange) => {
      switch (type) {
        case InputChange.TITLE:
          setValue(e.target.value);
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
    }, [],
  );

  const canSave = () => [value.trim(), dateFinish, dateStart].every(Boolean);

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    const fixedTitle = capitalize(value).trim();
    const fixedStartDate = getDateForm(new Date(dateStart));
    const fixedFinishDate = getDateForm(new Date(dateFinish));

    if (!TODO_REGEX.test(value) && value) {
      setError(ErrorMessage.INCORRECT);

      return;
    }

    if (!canSave()) {
      setError(ErrorMessage.EMPTY);

      return;
    }

    if (new Date(dateStart).getFullYear() < new Date().getFullYear()) {
      setError(ErrorMessage.DATE_GREATER);

      return;
    }

    if (
      +new Date(dateStart) > +new Date(dateFinish)
      || fixedFinishDate === 'Invalid Date'
      || fixedStartDate === 'Invalid Date'
    ) {
      setError(ErrorMessage.INCORRECT_DATE);

      return;
    }

    if (!selectedTodo) {
      dispatch(queryActions.setQuery(''));
    }

    const todo = {
      id: selectedTodo ? selectedTodo.id : +new Date(),
      title: fixedTitle,
      completed: selectedTodo ? selectedTodo.completed : false,
      createdAt: fixedStartDate,
      finishAt: fixedFinishDate,
    };

    const action = selectedTodo ? todoActions.updateTodo : todoActions.addTodo;

    dispatch(action(todo));
    onClose();
  };

  const hanldeClose = () => {
    onClose();
    setValue('');
  };

  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <h1 className="form__title">
        {selectedTodo
          ? 'Edit form'
          : 'Here, you can add additional information'}
      </h1>
      <InputField
        text={selectedTodo ? 'You can change the title' : 'Fill the title'}
        values={value}
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
