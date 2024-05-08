import { getJson } from 'serpapi';

export function serpTrendQuery({ queryParams }) {
  return getJson(
    {
      api_key: process.env.SERP_API_KEY,
      engine: 'google_trends',
      ...queryParams,
    },
    (json) => {
      return json;
    },
  );
}
