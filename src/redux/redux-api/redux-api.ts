import { apiFechInterface } from '../redux-type';

export const apiFetch = async ({
  categoryId,
  page,
  limit,
  table,
  all = false,
  cookie = '',
}: apiFechInterface): Promise<any> => {
  const str = `${process.env.DOMAIN}/api/${table}?${page && `page=${page}`}&${
    limit && `limit=${limit}`
  }&${categoryId && `categoryId=${categoryId}`}`;

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
