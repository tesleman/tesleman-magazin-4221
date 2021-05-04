import { apiFechInterface } from '../redux-type';

export const apiFetch = async ({
  category,
  page,
  limit,
  table,
  all = false,
  cookie = '',
}: apiFechInterface): Promise<any> => {
  const str = `${process.env.domein}/api/${table}?${page && `page=${page}`}&${
    limit && `limit=${limit}`
  }&${category && `category=${category}`}`;

  const fecdData = await fetch(str, {
    headers: {
      cookie: cookie,
    },
    method: 'GET',
    credentials: 'include',
  });

  if (fecdData.status === 401) {
    return { data: [] };
  }

  const data = await fecdData.json();

  if (data.message !== 'succes') {
    return data;
  }
  if (!all) {
    return data.data;
  }
  return data;
};
