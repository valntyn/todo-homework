type IsActiveState = {
  isActive: boolean,
};

const initialState: IsActiveState = {
  isActive: false,
};

type IsActiveAction = {
  type: 'status/change',
  payload: boolean;
};

const setIsActive = (isActive: boolean): IsActiveAction => ({
  type: 'status/change',
  payload: isActive,
});

export const actions = { setIsActive };

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
