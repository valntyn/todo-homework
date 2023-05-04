import { formatDate } from './dateConfigure';
import { TODO_REGEX } from '../constants';
import { ErrorMessage } from '../types/ErrorMessage';

export const validateForm = (
  value: string,
  dateStart: string | Date,
  dateFinish: string | Date,
): ErrorMessage => {
  const fixedStartDate = formatDate(new Date(dateStart));
  const fixedFinishDate = formatDate(new Date(dateFinish));

  if (!TODO_REGEX.test(value) && value) {
    return ErrorMessage.INCORRECT;
  }

  if (![value.trim(), dateFinish, dateStart].every(Boolean)) {
    return ErrorMessage.EMPTY;
  }

  if (+new Date(dateStart) > +new Date(dateFinish)) {
    return ErrorMessage.DATE_GREATER;
  }

  if (
    new Date(dateStart).getFullYear() < new Date().getFullYear()
    || fixedFinishDate === 'Invalid Date'
    || fixedStartDate === 'Invalid Date'
  ) {
    return ErrorMessage.INCORRECT_DATE;
  }

  return ErrorMessage.NONE;
};
