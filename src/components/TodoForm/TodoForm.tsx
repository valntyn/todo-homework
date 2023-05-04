import {
  FormEvent, memo, useCallback, useEffect, useState,
} from 'react';

import { capitalize } from '../../helpers/capitalize';
import {
  getDateForInput, convertToDate, formatDate,
} from '../../helpers/dateConfigure';
import { validateForm } from '../../helpers/formValidation';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { actions as filterActions } from '../../store/actions/filterAction';
import { actions as todoActions } from '../../store/actions/todosActions';
import './TodoForm.scss';
import { ErrorMessage } from '../../types/ErrorMessage';
import { Filter } from '../../types/Filter';
import { InputChange } from '../../types/InputChange';
import { ITodo } from '../../types/Todo';
import { InputField } from '../InputField';

type PropTypes = {
  onClose: () => void;
  selectedTodo?: ITodo;
  setQuery?: (queryFromHeader: string) => void;
  queryFromHeader?: string,
};

export const TodoForm: React.FC<PropTypes> = memo(({
  onClose, selectedTodo, queryFromHeader, setQuery,
}) => {
  const [value, setValue] = useState('');
  const [dateStart, setDateStart] = useState<string | Date>('');
  const [dateFinish, setDateFinish] = useState<string | Date>('');
  const [error, setError] = useState(ErrorMessage.NONE);

  const dispatch = useAppDispatch();
  const now = new Date();

  useEffect(() => {
    if (selectedTodo) {
      setDateStart(convertToDate(selectedTodo.createdAt));
      setDateFinish(convertToDate(selectedTodo.finishAt));
      setValue(selectedTodo.title);
    } else {
      const tomorrowDate = new Date(now);

      tomorrowDate.setDate(now.getDate() + 1);
      setDateStart(getDateForInput(now));
      setDateFinish(getDateForInput(tomorrowDate));
      setValue(queryFromHeader!);
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

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();

    const fixedTitle = capitalize(value).trim();
    const fixedStartDate = formatDate(new Date(dateStart));
    const fixedFinishDate = formatDate(new Date(dateFinish));

    const receivedError = validateForm(value, dateStart, dateFinish);

    if (receivedError) {
      setError(receivedError);

      return;
    }

    if (!selectedTodo && queryFromHeader) {
      setQuery?.('');
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
    dispatch(filterActions.setFilter(Filter.ALL));
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
        min={getDateForInput(now)}
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
