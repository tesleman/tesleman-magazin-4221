import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { NextRouter, useRouter } from 'next/router';

const Filters = ({ frome, too, all }) => {
  const router = useRouter();
  const [qeryState, setQeryState] = React.useState('');
  const sorting = (value) => {
    if (!value) return;
    if (value === 'price ascending') return { pricesort: 'ascending' };
    if (value === 'price descending') return { pricesort: 'descending' };
    if (value === 'data descending') return { data: 'descending' };
    if (value === 'data ascending') return { data: 'ascending' };
  };

  const slug = (router: NextRouter) => {
    if (!router.query.slug) return;
    return { slug: router.query.slug };
  };
  const page = (router: NextRouter) => {
    if (!router.query.page) return;
    return { page: router.query.page };
  };
  const textPageSearch = (value) => {
    if (!value) return;
    return { q: value };
  };
  const onTextHandleChang = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQeryState(event.target.value);
  };
  React.useEffect(() => {
    if (router.pathname.split('/').includes('shop')) setQeryFunctyon();
    return () => {};
  }, [qeryState]);

  const setQeryFunctyon = (value = '') => {
    const sort = sorting(value);
    const pages = page(router);
    const slugs = slug(router);
    const text = textPageSearch(qeryState);
    router.push({
      pathname: `/shop/${router.query.slug ? '[slug]' : ''}`,
      query: {
        ...pages,
        ...sort,
        ...slugs,
        ...text,
      },
    });
  };
  const onHandleChang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQeryFunctyon(event.target.value);
  };
  return (
    <Container>
      <Grid container direction="row">
        <Grid item xs={6}>
          Showing {frome}–{too} of {all} results
        </Grid>
        <Grid item xs={6}>
          <select onChange={onHandleChang} name="price">
            <option value="price ascending">Price ascending </option>
            <option value="price descending">Price descending</option>
            <option value="data descending">data descending</option>
            <option value="data ascending">data ascending</option>
          </select>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="flex-end">
        <label htmlFor="search">
          search
          <input onChange={onTextHandleChang} name="search" type="text" />
        </label>
      </Grid>
    </Container>
  );
};

export default Filters;
