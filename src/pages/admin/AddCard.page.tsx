import { type } from 'os';
import React from 'react';
import { useForm } from 'react-hook-form';

export interface responsIntrfaceInput {
  images: FormData;
  title: string;
  subtitle: string;
  description: string;
  category: string;
}

const AddCard = () => {
  const [stateImg, setstateImg] = React.useState([]);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: responsIntrfaceInput) => {
    const formData = new FormData();
    Array.from(data.images).forEach((file: any) => {
      formData.append('avatar', file);
    });

    const response = await fetch('http://localhost:3000/api/file', {
      body: formData,
      method: 'post',
    });
    console.log(data, '1');
    let user = await response.json();
    data.images = user;
    console.log(data, '2');

    const responseS = await fetch('http://localhost:3000/api/card', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'post',
    });
    let responseSs = await responseS.json();
    console.log(responseSs, 'responseS.json()');
    console.log(responseS, 'responseS ');
    // setstateImg(user);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="file">
          file
          <input ref={register} type="file" name="images" multiple />
        </label>
        <label htmlFor="title">
          title
          <input ref={register} type="text" name="title" multiple />
        </label>
        <label htmlFor="subtitle">
          subtitle
          <input ref={register} type="text" name="subtitle" multiple />
        </label>
        <label htmlFor="description">
          description
          <input ref={register} type="text" name="description" multiple />
        </label>
        <label htmlFor="category">
          category
          <input ref={register} type="text" name="category" multiple />
        </label>
        <button type="submit">submit</button>
      </form>
      {/* {stateImg && stateImg.map((e, i) => <img key={i} src={e} alt="" />)} */}
    </div>
  );
};
export default AddCard;
