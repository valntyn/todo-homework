export type QueryAction = {
  type: 'query/change',
  payload: string;
};

const setQuery = (query: string): QueryAction => ({
  type: 'query/change',
  payload: query,
});

export const actions = { setQuery };
