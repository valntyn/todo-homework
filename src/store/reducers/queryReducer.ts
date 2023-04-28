import { QueryAction } from '../actions/queryAction';

type QueryState = {
  query: string,
};

const initialState: QueryState = {
  query: '',
};

type Action = QueryAction;

export const queryActionReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'query/change':
      return {
        ...state,
        query: action.payload,
      };
    default:
      return state;
  }
};

export default queryActionReducer;
