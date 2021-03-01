import { apiFechInterface } from '../../components/component-types';

export const apiFetch = async ({
  category = '',
  page = 0,
  limit = 3,
  table = '',
}: apiFechInterface) => {
  const fecdData = await fetch(
    `http://${process.env.domein}/api/${table}?page=${page}&limit=${limit}${
      category && `&category=${category}`
    }`,
  );
  const data = await fecdData.json();

  return data.data;
};
