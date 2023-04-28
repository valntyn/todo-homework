export type IsActiveAction = {
  type: 'status/change',
  payload: boolean;
};

const setIsActive = (isActive: boolean): IsActiveAction => ({
  type: 'status/change',
  payload: isActive,
});

export const actions = { setIsActive };
