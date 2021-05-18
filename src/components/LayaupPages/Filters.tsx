import React from 'react';
import { Container, FormControl, Grid, InputLabel, Select, TextField } from '@material-ui/core';
import { NextRouter, useRouter } from 'next/router';

const sekectArray = [
  {
    value: 'price ascending',
    text: 'Price ↑',
  },
  {
    value: 'price descending',
    text: 'Price ↓',
  },
  {
    value: 'data ascending',
    text: 'Data  ↑',
  },
  {
    value: 'data descending',
    text: 'Data ↓',
  },
];
const Filters = ({ frome = 0, too = 0, all = 0 }) => {
  const router = useRouter();

  const [qeryState, setQeryState] = React.useState(
    router.query.price || router.query.data ? Object.entries(router.query)[0].join(' ') : '',
  );
  const [stateText, setstateText] = React.useState(
    router.query.q ? (router.query.q as string) : '',
  );

  const sorting = (value: string) => {
    if (!value) return;
    //разбивка значения инпута для формата чтоб запушить в qery
    const splitedValue = value.split(' ');
    return { [splitedValue[0]]: splitedValue[1] };
  };

  const slug = (router: NextRouter) => {
    if (!router.query.slug) return;
    return { slug: router.query.slug, q: router.query.q ? (router.query.q as string) : '' };
  };
  const page = (router: NextRouter) => {
    if (!router.query.page) return;
    return { page: router.query.page, q: router.query.q ? (router.query.q as string) : '' };
  };
  const textPageSearch = (value: string) => {
    return { q: value, page: 1 };
  };
  const onTextHandleChang = (event: React.ChangeEvent<HTMLInputElement>) => {
    setstateText(event.target.value);
  };

  React.useEffect(() => {
    setQeryFunctyon();

    return () => {};
  }, [qeryState, stateText]);

  const setQeryFunctyon = () => {
    const text = textPageSearch(stateText);
    const sort = sorting(qeryState);
    const pages = page(router);
    const slugs = slug(router);

    router.push(
      {
        query: {
          ...pages,
          ...sort,
          ...slugs,
          ...text,
        },
      },
      undefined,
      { scroll: false },
    );
  };
  const onHandleChang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQeryState(event.target.value);
  };

  return (
    <Container>
      <Grid container direction="row">
        <Grid item xs={6}>
          Showing {frome}–{too} of {all} results
        </Grid>
        <Grid item xs={6}>
          <FormControl variant="filled">
            <Grid container direction="row">
              <Grid item xs={6}>
                <InputLabel htmlFor="filled-age-native-simple">Sorting</InputLabel>
                <Select defaultValue={qeryState} native onChange={onHandleChang}>
                  {sekectArray.map((element) => (
                    <option key={element.value} value={element.value}>
                      {element.text}
                    </option>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  defaultValue={stateText}
                  id="outlined-basic"
                  label="search"
                  variant="filled"
                  onChange={onTextHandleChang}
                  name="search"
                />
              </Grid>
            </Grid>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Filters;
