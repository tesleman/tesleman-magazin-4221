import React from 'react';
import { Button, FormControl, FormHelperText, Grid, NativeSelect } from '@material-ui/core';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import Image from 'next/image';
import { apiFetch } from '../../../redux/redux-api/redux-api';
import { uploatData, cardCreate, CardUpdate } from '../../../utils/fileUploads';
import { responsIntrfaceInput } from './index.page';

const AddEditCard = ({
  slug = '',
  title = '',
  category = '',
  categoryslug = '',
  price = '',
  detail = '',
  artikul = '',
  description = '',
  subtitle = '',
  images = [],
  _id = null,
}) => {
  const { register, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      slug,
      title,
      category,
      categoryslug,
      price,
      detail,
      artikul,
      description,
      subtitle,
    },
  });
  const [stateError, setstateError] = React.useState(null);
  const [stateCat, setCat] = React.useState([]);
  const [stateLocalImages, setLocalImages] = React.useState(images);
  const [togleChecbox, setstogleChecbox] = React.useState(false);
  const [selectDefaultValue, setStateDefaultValue] = React.useState(0);
  const router = useRouter();

  const onSubmit = async (data: responsIntrfaceInput, e) => {
    // create a card

    try {
      if (!_id) {
        const temporaryImg = data.images;
        data.images = [];
        // posting card  with image to DB
        const cardCreateWithoutImg = await cardCreate(data);

        const images = await uploatData(temporaryImg);
        data.images = images;
        const update = await CardUpdate({ _id: cardCreateWithoutImg.data._id, data });

        if (cardCreateWithoutImg.message.keyValue && cardCreateWithoutImg.message.keyValue.slug)
          setstateError(cardCreateWithoutImg.message.keyValue);
      }
      const temporaryImg = data.images;
      if (temporaryImg.length > 0) {
        const imagesUploda = await uploatData(temporaryImg);
        data.images = [...stateLocalImages, ...imagesUploda];
      }
      if (temporaryImg.length <= 0) {
        data.images = images;
      }
      const update = await CardUpdate({ _id, data });

      if (update.status === 200) {
        router.reload();
      }
      // e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    titleCheng();
  }, [togleChecbox]);

  const fech = async () => {
    //feching categoryes
    const apiFetchCategoryParams = {
      table: 'category',
    };
    const category = await apiFetch(apiFetchCategoryParams);
    setCat(category);
  };
  React.useEffect(() => {
    fech();

    return () => {};
  }, []);

  React.useEffect(() => {
    const defaultValue = selectedValuseDefault(stateCat, categoryslug, _id);

    if (defaultValue >= 0) {
      setStateDefaultValue(defaultValue);
    }
  }, [stateCat]);

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

  const categoryHandlChang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStateDefaultValue(+event.target.value);
    setValue('category', stateCat[+event.target.value].title.trim());
    setValue('categoryslug', stateCat[+event.target.value].slug);
  };

  const selectedValuseDefault = (slug: any[], categoryslug: string, _id: string) => {
    if (!_id) {
      return;
    }
    return slug.findIndex((e) => e.slug === categoryslug);
  };

  const hendleDelleteImage = (elem: number) => {
    setLocalImages((prevState) => prevState.filter((e) => e !== elem));
  };
  return (
    <div>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
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
            }}
          >
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

        <FormControl style={{ width: 150 }}>
          <NativeSelect value={selectDefaultValue} onChange={categoryHandlChang}>
            {stateCat.map((e, i: number) => (
              <option key={i} value={i}>
                {e.title}
              </option>
            ))}
          </NativeSelect>
          <FormHelperText>Uncontrolled</FormHelperText>
        </FormControl>

        <input name="categoryslug" ref={register} style={{ display: 'none' }} />
        <input name="category" ref={register} style={{ visibility: 'hidden' }} />
        <label htmlFor="file">
          <input ref={register} type="file" name="images" multiple />
          file
        </label>

        <button style={{ width: 70 }} type="submit">
          submit
        </button>
      </form>
      <Grid container direction="row">
        {stateLocalImages &&
          stateLocalImages.map((e, i) => (
            <Grid key={i} item xs={3}>
              <Image width={200} height={200} src={e} alt="" />
              <button onClick={() => hendleDelleteImage(e)}>{i}</button>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default AddEditCard;
