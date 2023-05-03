import { Filter } from '../../types/Filter';

type SetFilterAction = {
  type: 'filter/change',
  payload: Filter,
};

export const setFilter = (filter: Filter): SetFilterAction => ({
  type: 'filter/change',
  payload: filter,
});

export type FilterAction = SetFilterAction;

export const actions = { setFilter };
