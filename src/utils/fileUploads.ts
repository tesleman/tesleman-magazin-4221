const uploatData = async (images: FileList | Array<string>) => {
  const formData = new FormData();
  // appending images to form data
  Array.from(images as FileList).forEach((file: any) => {
    formData.append('avatar', file);
  });

  const response = await fetch(`http://${process.env.domein}/api/file`, {
    body: formData,
    method: 'post',
  }); // posting file to file system

  return await response.json(); // array with image link
};

const cardCreate = async (data) => {
  const cardCreate = await fetch(`http://${process.env.domein}/api/card`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    method: 'post',
  });
  const respons = await cardCreate.json();
  return respons;
};

const CardUpdate = async ({ _id, ...args }) => {
  const cardUpdate = await fetch(`http://${process.env.domein}/api/card`, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ _id, ...args.data }),
    method: 'PATCH',
  });
  const returnes = await cardUpdate.json();
  return returnes;
};

export { uploatData, cardCreate, CardUpdate };
