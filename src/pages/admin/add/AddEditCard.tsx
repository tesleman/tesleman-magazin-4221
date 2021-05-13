import React from 'react';
import { Button, FormControl, FormHelperText, Grid, NativeSelect, Paper } from '@material-ui/core';
import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';

import Image from 'next/image';
import { apiFetch } from '../../../redux/redux-api/redux-api';
import { uploatData, cardCreate, CardUpdate } from '../../../utils/fileUploads';
import { responsIntrfaceInput } from './index.page';
import { useStyles } from './add.style';
import { titleCheng } from '../../../utils/slug';
import { CardScemaInterface } from '../../api/models/cardScema';

const AddEditCard: React.FC<responsIntrfaceInput> = ({
  active = true,
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
      active,
      slug,
      title,
      category,
      categoryslug,
      price,
      detail,
      artikul,
      description,
      subtitle,
      images: null,
    },
  });
  const [stateError, setstateError] = React.useState(null);
  const [stateCat, setCat] = React.useState([]);
  const [stateLocalImages, setLocalImages] = React.useState(images);
  const [togleChecbox, setstogleChecbox] = React.useState(false);
  const [selectDefaultValue, setStateDefaultValue] = React.useState(0);
  const style = useStyles();
  const router = useRouter();

  const onSubmit = async (data) => {
    // create a card

    try {
      if (!_id) {
        const temporaryImg = data.images;
        console.log(temporaryImg);
        data.images = [];
        // posting card  with image to DB
        if (!data.categoryslug) {
          data.categoryslug = stateCat[0].slug;
        }
        const cardCreateWithoutImg = await cardCreate(data);
        if (cardCreateWithoutImg.message.errors) {
          setstateError(cardCreateWithoutImg.message.errors);
        }
        if (cardCreateWithoutImg.message.keyValue && cardCreateWithoutImg.message.keyValue.slug) {
          setstateError(cardCreateWithoutImg.message.keyValue);
        }
        console.log(cardCreateWithoutImg);
        if (temporaryImg.length > 0) {
          const images = await uploatData(temporaryImg);
          data.images = images.images;
        }

        const update = await CardUpdate({ _id: cardCreateWithoutImg.data._id, data });
        if (update.message === 'succes') {
          router.push(`update/${update.data._id}`);
        }
        console.log(update, 11);
      }
      if (_id) {
        const temporaryImg = data.images;
        if (temporaryImg.length > 0) {
          const imagesUploda = await uploatData(temporaryImg);
          if (imagesUploda.message === 'succes') {
            setValue('images', null);
          }
          setLocalImages((prevImg) => [...prevImg, ...imagesUploda.images]);
          data.images = [...stateLocalImages, ...imagesUploda.images];
        }
        if (temporaryImg.length <= 0) {
          data.images = [...stateLocalImages];
        }

        const ss = await CardUpdate({ _id, data });
        console.log(ss, 22);
      }
      // e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };

  const fech = async () => {
    //feching categoryes
    const apiFetchCategoryParams = {
      table: 'category',
    };
    const category = await apiFetch(apiFetchCategoryParams);
    setCat(category);
  };
  React.useEffect(() => {
    titleCheng(togleChecbox, getValues, setValue);
  }, [togleChecbox]);
  React.useEffect(() => {
    fech();
  }, []);

  React.useEffect(() => {
    let defaultValue;

    if (_id) {
      defaultValue = selectedValuseDefault(stateCat, categoryslug);
    }
    if (defaultValue !== undefined) {
      setStateDefaultValue(defaultValue);
    }
  }, [stateCat]);

  const checBox = () => {
    setstogleChecbox(!togleChecbox);
  };

  const categoryHandlChang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStateDefaultValue(+event.target.value);
    setValue('category', stateCat[+event.target.value].title.trim());
    setValue('categoryslug', stateCat[+event.target.value].slug);
  };

  const selectedValuseDefault = (slug: any[], categoryslug: string) => {
    return slug.findIndex((e) => e.slug === categoryslug);
  };

  const hendleDelleteImage = (elem: string) => {
    setLocalImages((prevState) => prevState.filter((e) => e !== elem));
  };
  return (
    <Paper>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit(onSubmit)}>
        <Grid alignContent="center" alignItems="flex-start" container direction="column">
          <Grid item xs={6}>
            <label className={style.row_item} htmlFor="title">
              <input name="active" ref={register} type="checkbox" />
              active
            </label>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="title">
              <Grid container direction="column">
                title
                <input
                  className={style.row_item}
                  key={124234535}
                  onChange={() => titleCheng(togleChecbox, getValues, setValue)}
                  ref={register}
                  type="text"
                  name="title"
                  multiple
                />
              </Grid>
            </label>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="title">
              <Grid className={style.row_item} container direction="row">
                <Grid item xs={10}>
                  <input
                    style={{ width: '100%' }}
                    onChange={() => titleCheng(togleChecbox, getValues, setValue)}
                    ref={register}
                    type="text"
                    name="slug"
                    multiple
                  />
                  {/* <Button
                    onClick={() => {
                      titleCheng(togleChecbox, getValues, setValue);
                      checBox();
                    }}
                  >
                    {togleChecbox ? 'Slug' : 'noSlug'}
                  </Button> */}
                </Grid>
                <Grid item xs={2}>
                  <span style={{ whiteSpace: 'nowrap' }}>
                    <input
                      onClick={() => titleCheng(togleChecbox, getValues, setValue)}
                      onChange={checBox}
                      name="checkbox"
                      type="checkbox"
                    />
                    {togleChecbox ? 'Slug' : 'noSlug'}
                  </span>
                  {stateError !== null && stateError?.slug && (
                    <div>
                      <span style={{ color: 'red' }}>{stateError.slug}</span> this slug already
                      exist
                    </div>
                  )}
                </Grid>
              </Grid>
            </label>
          </Grid>
          <label htmlFor="subtitle">
            <Grid container direction="column">
              subtitle
              <input
                className={style.row_item}
                ref={register}
                type="text"
                name="subtitle"
                multiple
              />
            </Grid>
          </label>
          {stateError?.subtitle && stateError?.subtitle.message}
          <label htmlFor="description">
            <Grid container direction="column">
              description
              <input
                className={style.row_item}
                ref={register}
                type="text"
                name="description"
                multiple
              />
            </Grid>
          </label>
          {stateError?.description && stateError?.description.message}
          <label htmlFor="description">
            <Grid container direction="column">
              artikul
              <input
                className={style.row_item}
                ref={register}
                type="text"
                name="artikul"
                multiple
              />
            </Grid>
          </label>
          <label htmlFor="detail">
            <Grid container direction="column">
              detail
              <textarea className={style.row_item} ref={register} name="detail" />
            </Grid>
          </label>
          <label htmlFor="price">
            <Grid container direction="column">
              price
              <input className={style.row_item} name="price" ref={register} />
            </Grid>
          </label>

          <FormControl style={{ width: 150 }}>
            <FormHelperText>Category</FormHelperText>
            <NativeSelect
              className={style.row_item}
              value={selectDefaultValue}
              onChange={categoryHandlChang}
            >
              {stateCat.map((e, i: number) => (
                <option key={i} value={i}>
                  {e.title}
                </option>
              ))}
            </NativeSelect>
          </FormControl>

          <input name="categoryslug" ref={register} style={{ display: 'none' }} />
          <input name="category" ref={register} style={{ visibility: 'hidden' }} />
          <label className={style.row_item} htmlFor="file">
            <input ref={register} type="file" name="images" multiple />
            file
          </label>

          <button className={style.row_item} style={{ width: 70 }} type="submit">
            submit
          </button>
        </Grid>
      </form>
      <Grid className={style.row_item} container direction="row">
        {stateLocalImages &&
          stateLocalImages.map((e, i) => (
            <Grid key={i} item xs={3}>
              <Image width={200} height={200} src={e} alt="" />
              <button onClick={() => hendleDelleteImage(e)}>{i}</button>
            </Grid>
          ))}
      </Grid>
    </Paper>
  );
};

export default AddEditCard;
