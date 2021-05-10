import { Grid } from '@material-ui/core';
import React from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { titleCheng } from '../../../utils/slug';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  title: yup.string().required('Pusto'),
  slug: yup.string().required('Pusto'),
});

const CategoryForm = ({
  seo = { meta_description: '', meta_keywords: '', meta_title: '' },

  slug = '',
  sort = '',
  title = '',
  _id = '',
}) => {
  const meta_description = seo.meta_description;
  const meta_keywords = seo.meta_keywords;
  const meta_title = seo.meta_title;
  const { register, handleSubmit, setValue, getValues, errors } = useForm({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      meta_description,
      meta_keywords,
      meta_title,
      slug,
      sort,
      title,
    },
  });
  const [togleChecbox, setstogleChecbox] = React.useState(false);

  const [error, setError] = React.useState(null);
  const checBox = () => {
    setstogleChecbox(!togleChecbox);
  };
  React.useEffect(() => {
    titleCheng(togleChecbox, getValues, setValue);
  }, [togleChecbox]);

  const onSubmitFeachHeandlwer = async (data) => {
    const fehData = await fetch(`${process.env.domein}/api/category`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: _id ? 'PATCH' : 'POST',
      body: JSON.stringify(data),
    });

    if (fehData.status === 301) {
      const error = await fehData.json();
      setError(error.error);
    }
  };
  const handlesubmitForm = (data) => {
    onSubmitFeachHeandlwer(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handlesubmitForm)} action="">
        <Grid container alignItems="flex-start" alignContent="center" direction="column">
          <Grid item xs={6}>
            <label htmlFor="title">
              <input
                onChange={() => titleCheng(togleChecbox, getValues, setValue)}
                style={{ margin: 7 }}
                ref={register}
                name="title"
                type="text"
              />
              title
            </label>
          </Grid>
          {errors.title && errors.title.message}
          <Grid item xs={6}>
            <label htmlFor="slug">
              <input
                onChange={() => titleCheng(togleChecbox, getValues, setValue)}
                style={{ margin: 7 }}
                ref={register}
                name="slug"
                type="text"
              />
              <input
                onClick={() => titleCheng(togleChecbox, getValues, setValue)}
                onChange={checBox}
                name="checkbox"
                type="checkbox"
              />
              slug
            </label>
          </Grid>
          {errors.slug && errors.slug.message}
          {error?.keyValue.slug && (
            <div>
              <span style={{ color: 'red' }}>{error.keyValue.slug}</span> this slug already exists
            </div>
          )}
          <Grid item xs={6}>
            <label htmlFor="sort">
              <input style={{ margin: 7 }} ref={register} name="sort" type="text" />
              sort
            </label>
          </Grid>
          sEO
          <Grid item xs={6}>
            <label htmlFor="meta_title">
              <input style={{ margin: 7 }} ref={register} name="meta_title" type="text" />
              meta title
            </label>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="meta_keywords">
              <input style={{ margin: 7 }} ref={register} name="meta_keywords" type="text" />
              meta keywords
            </label>
          </Grid>
          <Grid item xs={6}>
            <label htmlFor="meta_description">
              <input style={{ margin: 7 }} ref={register} name="meta_description" type="text" />
              meta description
            </label>
          </Grid>
        </Grid>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default CategoryForm;
