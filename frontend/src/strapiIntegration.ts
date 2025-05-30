export const STRAPI_URL = import.meta.env.DEV
  ? 'http://localhost:1337'
  : 'https://efficient-diamond-bfe21915f7.strapiapp.com';

export const getImageDownloadUrl = (extension: string) =>
  `${STRAPI_URL}${extension}`;
