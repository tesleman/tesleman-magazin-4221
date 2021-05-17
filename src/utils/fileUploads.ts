import { responsIntrfaceInput } from '../pages/admin/add/index.page';

const uploatData = async (images: FileList | Array<string>) => {
  const formData = new FormData();
  // appending images to form data
  Array.from(images as FileList).forEach((file: any) => {
    formData.append('avatar', file);
  });

  const response = await fetch(`${process.env.DOMAIN}/api/file`, {
    body: formData,
    credentials: 'include',
    method: 'post',
  }); // posting file to file system
  return await response.json(); // array with image link
};

const cardCreate = async (data: responsIntrfaceInput) => {
  const cardCreate = await fetch(`${process.env.DOMAIN}/api/card`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
    method: 'post',
  });
  const respons = await cardCreate.json();
  return respons;
};

const CardUpdate = async ({ _id, ...args }) => {
  try {
    const cardId = _id;
    const dataForUpdate = { ...args.data };

    const cardUpdate = await fetch(`${process.env.DOMAIN}/api/card`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({ _id: cardId, ...dataForUpdate }),
    });
    const returnes = await cardUpdate.json();
    return returnes;
  } catch (error) {
    console.log(error);
  }
};

export { uploatData, cardCreate, CardUpdate };
