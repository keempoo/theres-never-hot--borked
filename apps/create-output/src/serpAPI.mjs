import { getJson } from 'serpapi';

export function serpTrendQuery({ queryParams }) {
  return getJson(
    {
      api_key: process.env.SERP_API_KEY,
      ...queryParams,
    },
    (json) => {
      return json;
    },
  );
}
