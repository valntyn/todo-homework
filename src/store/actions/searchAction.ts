export type SearchAction = {
  type: 'search/write',
  payload: string,
};

export const setSearch = (search: string): SearchAction => ({
  type: 'search/write',
  payload: search,
});

export const actions = { setSearch };
