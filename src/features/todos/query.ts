type QueryState = {
  query: string,
};

const initialState: QueryState = {
  query: '',
};

type QueryAction = {
  type: 'query/change',
  payload: string;
};

const setQuery = (query: string): QueryAction => ({
  type: 'query/change',
  payload: query,
});

export const actions = { setQuery };

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
