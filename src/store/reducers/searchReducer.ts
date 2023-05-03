import { SearchAction } from '../actions/searchAction';

type SearchState = {
  search: string;
};

const initialState: SearchState = {
  search: '',
};

const searchReducer = (state = initialState, action: SearchAction) => {
  switch (action.type) {
    case 'search/write':
      return {
        ...state,
        search: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
