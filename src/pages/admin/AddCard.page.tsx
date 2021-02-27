import { type } from 'os';
import React from 'react';
import { useForm } from 'react-hook-form';
import { apiFetch } from '../../redux/redux-api/redux-api';

export interface responsIntrfaceInput {
  images: FormData;
  title: string;
  subtitle: string;
  description: string;
  category: string;
}

const AddCard = () => {
  const { register, handleSubmit } = useForm();
  const [stateImg, setstateImg] = React.useState([]);
  const [stateCat, setCat] = React.useState([]);

  const onSubmit = async (data: responsIntrfaceInput) => {
    const formData = new FormData();
    Array.from(data.images).forEach((file: any) => {
      formData.append('avatar', file);
    });

    const response = await fetch('http://localhost:3000/api/file', {
      body: formData,
      method: 'post',
    });
    let user = await response.json();
    data.images = user;

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

  React.useEffect(() => {
    const fech = async () => {
      const apiFetchCategoryParams = {
        page: 0,
        limit: 3,
        table: 'category',
      };
      const category = await apiFetch(apiFetchCategoryParams);
      setCat(category);
    };
    fech();
    return () => {};
  }, []);
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
        <select name="cat" ref={register}>
          {stateCat.map((e) => (
            <option value={e.title}>{e.title}</option>
          ))}
        </select>
        <button type="submit">submit</button>
      </form>
      {/* {stateImg && stateImg.map((e, i) => <img key={i} src={e} alt="" />)} */}
    </div>
  );
};
export default AddCard;
