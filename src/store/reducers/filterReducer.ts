import { Filter } from '../../types/Filter';
import { FilterAction } from '../actions/filterAction';

type FilterState = {
  filter: Filter,
};

const initialState: FilterState = {
  filter: Filter.ALL,
};

const filterReducer = (state = initialState, action: FilterAction) => {
  switch (action.type) {
    case 'filter/change':
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
