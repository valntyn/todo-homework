import { IsActiveAction } from '../actions/modalActions';

type IsActiveState = {
  isActive: boolean,
};

const initialState: IsActiveState = {
  isActive: false,
};

type Action = IsActiveAction;

const isActiveReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'status/change':
      return {
        ...state,
        isActive: action.payload,
      };
    default:
      return state;
  }
};

export default isActiveReducer;
