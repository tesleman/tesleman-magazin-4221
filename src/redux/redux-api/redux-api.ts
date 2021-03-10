import { apiFechInterface } from '../redux-type';

export const apiFetch = async ({ category, page, limit, table, all = false }: apiFechInterface) => {
  const str = `http://${process.env.domein}/api/${table}?${page && `page=${page}`}&${
    limit && `limit=${limit}`
  }&${category && `category=${category}`}`;

  const fecdData = await fetch(str);
  const data = await fecdData.json();

  if (!all) {
    return data.data;
  } else {
    return data;
  }
};
