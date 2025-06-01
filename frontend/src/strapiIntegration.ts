export const SANITY_URL = 'https://4osu5sin.api.sanity.io/v2025-06-01';

export const getApiUrl = (query: string) =>
  `${SANITY_URL}/data/query/production?query=${encodeURI(query)}`;
