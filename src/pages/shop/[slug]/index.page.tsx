import { Grid } from '@material-ui/core';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShopLayuot from '../shop.layuot';
import { useStyles, useStylesType } from '../styles/shop.style';
import {
  Card,
  Pagin,
  apiFetch,
  addTooCart,
  RootState,
  getCard,
  Layuot,
} from '../shop.import-export';
import { SingleCategoryI } from '../shop-types';
import { useRouter } from 'next/router';
import { cardProps } from '../dbSSprops';
export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const props = await cardProps(query);

  return {
    props: { json: props },
    // will be passed to the page component as props
  };
};

const SingleCategory = ({ json }) => {
  const { totalCount, card, client } = JSON.parse(json);

  const style: useStylesType = useStyles();
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);
  const limitLocal = 3;
  const [page, setPage] = React.useState(1);

  const count = Math.ceil(totalCount / limitLocal);

  const dispatch = useDispatch();
  const handleChange = React.useCallback((event, value) => {
    setPage(value);
  }, []);
  const addTooCartHendl = React.useCallback((props) => dispatch(addTooCart(props)), []);

  const routClient = useRouter();

  return (
    <Layuot baseCategory={{ category: 'Shop', link: '/shop' }}>
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
