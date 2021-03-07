import { apiFechInterface } from '../redux-type';

export const apiFetch = async ({ category, page, limit, table }: apiFechInterface) => {
  const str = `http://${process.env.domein}/api/${table}?${page && `page=${page}`}&${
    limit && `limit=${limit}`
  }&${category && `category=${category}`}`;

  const fecdData = await fetch(str);
  const data = await fecdData.json();

  return data.data;
};
