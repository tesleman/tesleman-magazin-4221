import { Grid } from '@material-ui/core';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles, useStylesType } from '../styles/shop.style';
import {
  Card,
  Pagin,
  apiFetch,
  addTooCart,
  RootState,
  Layuot,
  cardInterface,
} from '../shop.import-export';

import { useRouter } from 'next/router';
import { cardProps } from '../dbSSprops';

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const props = await cardProps(query);

  return {
    props: { json: props },
    // will be passed to the page component as props
  };
};

export interface propsI {
  totalCount: number;
  card: Array<cardInterface>;
}

const SingleCategory: React.FC<{ json: string }> = ({ json }) => {
  const { totalCount, card }: propsI = JSON.parse(json);

  const style: useStylesType = useStyles();
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);
  const limitLocal = 3;
  const [page, setPage] = React.useState(1);

  const count = Math.ceil(totalCount / limitLocal);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleChange = React.useCallback((event, value) => {
    setPage(value);
    router.push(
      {
        pathname: '/shop/[slug]',

        query: {
          slug: router.query.slug,
          page: value,
        },
      },
      undefined,
      { scroll: false },
    );
  }, []);
  const addTooCartHendl = React.useCallback((props) => dispatch(addTooCart(props)), []);

  const fromeCount = page * limitLocal - limitLocal + 1;
  const tooCount = fromeCount + card.length - 1;
  return (
    <Layuot
      category={card.length > 0 && card[0].category}
      frome={fromeCount}
      too={tooCount}
      all={count}
      baseCategory={{ category: 'Shop', link: '/shop' }}>
      <Grid container direction="row">
        {card.map((e) => (
          <Card cart={cart} key={e._id} card={e} addTooCartHendl={addTooCartHendl} />
        ))}
      </Grid>
      <Grid container direction="row" justify="center" alignContent="center">
        <Pagin page={page} handleChange={handleChange} count={count} />
      </Grid>
    </Layuot>
  );
};

export default SingleCategory;
