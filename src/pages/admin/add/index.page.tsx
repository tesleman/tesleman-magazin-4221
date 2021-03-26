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
  categoryslug: string;
  detail: string;
  slug: string;
}

const AddCard = () => {
  const { register, handleSubmit, setValue, getValues, reset } = useForm();
  const [stateError, setstateError] = React.useState(null);
  const [stateCat, setCat] = React.useState([]);
  const [togleChecbox, setstogleChecbox] = React.useState(false);

  const onSubmit = async (data: responsIntrfaceInput, e) => {
    // create a card
    try {
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

      if (responseSs.message === 'succes') e.target.reset();
      if (responseSs.message.keyValue && responseSs.message.keyValue.slug)
        setstateError(responseSs.message.keyValue);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    titleCheng();
  }, [togleChecbox]);

  React.useEffect(() => {
    const fech = async () => {
      //feching categoryes
      const apiFetchCategoryParams = {
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
        remove: /[*+~.()'"!:@ь]/g,
        lower: true,
        locale: 'us',
      });
      setValue('slug', slug);
      setValue('title', box.trim());
    }
  };

  const checBox = () => {
    setstogleChecbox(!togleChecbox);
  };

  const categoryHandlChang = (event) => {
    const parseEventCategorySlug = JSON.parse(event.target.value);

    setValue('category', parseEventCategorySlug.title.trim());
    setValue('categoryslug', parseEventCategorySlug.slug);
  };

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
          <input onClick={titleCheng} onChange={checBox} name="checkbox" type="checkbox" />
          slug
          {stateError !== null && stateError.slug && (
            <div>same slug already exist {stateError.slug}</div>
          )}
        </label>
        <label htmlFor="subtitle">
          <input ref={register} type="text" name="subtitle" multiple />
          subtitle
        </label>
        <label htmlFor="description">
          <input ref={register} type="text" name="description" multiple />
          description
        </label>
        <label htmlFor="description">
          <input ref={register} type="text" name="artikul" multiple />
          artikul
        </label>
        <label htmlFor="detail">
          <textarea ref={register} name="detail" />
          detail
        </label>
        <label htmlFor="price">
          <input name="price" ref={register} />
          price
        </label>

        <select
          style={{ width: 150 }}
          defaultValue={stateCat.length > 0 && stateCat[0].title}
          onChange={categoryHandlChang}>
          <option value=""></option>
          {stateCat.map((e) => (
            <option key={e._id} value={JSON.stringify(e)}>
              {e.title}
            </option>
          ))}
        </select>
        <input name="categoryslug" ref={register} style={{ display: 'none' }} />
        <input name="category" ref={register} style={{ visibility: 'hidden' }} />

        <button style={{ width: 70 }} type="submit">
          submit
        </button>
      </form>
      {/* {stateImg && stateImg.map((e, i) => <img key={i} src={e} alt="" />)} */}
    </div>
  );
};
export default AddCard;
