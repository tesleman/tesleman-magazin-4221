import { Button } from '@material-ui/core';
import React from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import { apiFetch } from '../../../redux/redux-api/redux-api';

export interface responsIntrfaceInput {
  images: FormData;
  title: string;
  subtitle: string;
  description: string;
  category: string;
}

const AddCard = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const [stateImg, setstateImg] = React.useState();
  const [stateCat, setCat] = React.useState([]);
  const [togleChecbox, setstogleChecbox] = React.useState(false);

  const onSubmit = async (data: responsIntrfaceInput) => {
    // create a cerd
    const formData = new FormData();
    // appending images to form data
    Array.from(data.images).forEach((file: any) => {
      formData.append('avatar', file);
    });

    const response = await fetch(`http://${process.env.domein}/api/file`, {
      body: formData,
      method: 'post',
    }); // posting file to file system
    let images = await response.json(); // array with image link
    data.images = images; // appenh array with image link to react-hook-form

    // posting card  with image to DB
    const responseS = await fetch(`http://${process.env.domein}/api/card`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      method: 'post',
    });
    let responseSs = await responseS.json();

    setstateImg(responseSs);
  };

  React.useEffect(() => {
    titleCheng();
  }, [togleChecbox]);

  React.useEffect(() => {
    const fech = async () => {
      //feching categoryes
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

  const titleCheng = () => {
    // slug creator
    if (!togleChecbox) {
      // if Checbox is off genereate slug frome slug feald
      let box = getValues('slug');
      let slug = slugify(box, {
        replacement: '_',
        remove: /[*+~.()'"!:@]/g,
      });
      setValue('slug', slug);
    }
    if (togleChecbox) {
      // if Checbox is on genereate slug frome title feald
      let box = getValues('title');
      let slug = slugify(box, {
        replacement: '_',
        remove: /[*+~.()'"!:@]/g,
      });
      setValue('slug', slug);
    }
  };

  const checBox = () => {
    setstogleChecbox(!togleChecbox);
  };
  console.log(togleChecbox);

  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="file">
          <input ref={register} type="file" name="images" multiple />
          file
        </label>
        <label htmlFor="title">
          <input
            key={124234535}
            onChange={titleCheng}
            ref={register}
            type="text"
            name="title"
            multiple
          />
          title
        </label>
        <label htmlFor="title">
          <input onChange={titleCheng} ref={register} type="text" name="slug" multiple />
          <Button
            onClick={() => {
              titleCheng();
              checBox();
            }}>
            {togleChecbox ? 'Slug' : 'noSlug'}
          </Button>
          <input
            key={124234535943583945}
            onClick={titleCheng}
            onChange={checBox}
            name="checkbox"
            type="checkbox"
          />
          slug
        </label>
        <label htmlFor="subtitle">
          <input ref={register} type="text" name="subtitle" multiple />
          subtitle
        </label>
        <label htmlFor="description">
          <input ref={register} type="text" name="description" multiple />
          description
        </label>
        <label htmlFor="detail">
          <textarea ref={register} name="detail" />
          detail
        </label>

        <select name="category" ref={register}>
          {stateCat.map((e) => (
            <option key={e._id} value={e.title}>
              {e.title}
            </option>
          ))}
        </select>
        <button type="submit">submit</button>
      </form>
      {/* {stateImg && stateImg.map((e, i) => <img key={i} src={e} alt="" />)} */}
    </div>
  );
};
export default AddCard;
