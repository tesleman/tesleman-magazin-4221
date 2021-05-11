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

const AddEditCard: React.FC<CardScemaInterface> = ({
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
    },
  });
  const [stateError, setstateError] = React.useState(null);
  const [stateCat, setCat] = React.useState([]);
  const [stateLocalImages, setLocalImages] = React.useState(images || []);
  const [togleChecbox, setstogleChecbox] = React.useState(false);
  const [selectDefaultValue, setStateDefaultValue] = React.useState(0);
  const style = useStyles();
  const router = useRouter();

  const onSubmit = async (data: responsIntrfaceInput, e) => {
    // create a card

    try {
      if (!_id) {
        const temporaryImg = data.images;
        data.images = [];
        // posting card  with image to DB
        if (!data.categoryslug) {
          data.categoryslug = stateCat[0].slug;
        }
        const cardCreateWithoutImg = await cardCreate(data);
        if (temporaryImg.length > 0) {
          const images = await uploatData(temporaryImg);
          data.images = images;
        }

        // const update = await CardUpdate({ _id: cardCreateWithoutImg.data._id, data });
        console.log(cardCreateWithoutImg, 11);
        if (cardCreateWithoutImg.message.keyValue && cardCreateWithoutImg.message.keyValue.slug)
          setstateError(cardCreateWithoutImg.message.keyValue);
      }
      if (_id) {
        const temporaryImg = data.images;
        if (temporaryImg.length > 0) {
          const imagesUploda = await uploatData(temporaryImg);
          setLocalImages((prevImg) => [...prevImg, ...imagesUploda]);
          data.images = [...stateLocalImages, ...imagesUploda];
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

    return () => {};
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
        <Paper>
          <Grid
            className={style.row_item}
            alignContent="center"
            alignItems="flex-start"
            container
            direction="column"
          >
            <Paper>
              <Grid
                className={style.row_item}
                alignContent="center"
                alignItems="flex-start"
                container
                direction="column"
              >
                <label className={style.row_item} htmlFor="title">
                  <input name="active" ref={register} type="checkbox" />
                  active
                </label>
                <label className={style.row_item} htmlFor="title">
                  <input
                    key={124234535}
                    onChange={() => titleCheng(togleChecbox, getValues, setValue)}
                    ref={register}
                    type="text"
                    name="title"
                    multiple
                  />
                  title
                </label>
                <label className={style.row_item} htmlFor="title">
                  <input
                    onChange={() => titleCheng(togleChecbox, getValues, setValue)}
                    ref={register}
                    type="text"
                    name="slug"
                    multiple
                  />
                  <Button
                    onClick={() => {
                      titleCheng(togleChecbox, getValues, setValue);
                      checBox();
                    }}
                  >
                    {togleChecbox ? 'Slug' : 'noSlug'}
                  </Button>
                  <input
                    className={style.row_item}
                    onClick={() => titleCheng(togleChecbox, getValues, setValue)}
                    onChange={checBox}
                    name="checkbox"
                    type="checkbox"
                  />
                  slug
                  {stateError !== null && stateError.slug && (
                    <div>same slug already exist {stateError.slug}</div>
                  )}
                </label>
                <label className={style.row_item} htmlFor="subtitle">
                  <input ref={register} type="text" name="subtitle" multiple />
                  subtitle
                </label>
                <label className={style.row_item} htmlFor="description">
                  <input ref={register} type="text" name="description" multiple />
                  description
                </label>
                <label className={style.row_item} htmlFor="description">
                  <input ref={register} type="text" name="artikul" multiple />
                  artikul
                </label>
                <label className={style.row_item} htmlFor="detail">
                  <textarea ref={register} name="detail" />
                  detail
                </label>
                <label className={style.row_item} htmlFor="price">
                  <input name="price" ref={register} />
                  price
                </label>

                <FormControl className={style.row_item} style={{ width: 150 }}>
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
                <label className={style.row_item} htmlFor="file">
                  <input ref={register} type="file" name="images" multiple />
                  file
                </label>

                <button className={style.row_item} style={{ width: 70 }} type="submit">
                  submit
                </button>
              </Grid>
            </Paper>
          </Grid>
        </Paper>
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
