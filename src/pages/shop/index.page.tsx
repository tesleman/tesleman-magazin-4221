import React from 'react';
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next';
import { useSelector, useDispatch } from 'react-redux';

import { Grid } from '@material-ui/core';
import { useStyles, useStylesType } from './styles/shop.style';

import { RootState } from '../../redux/store';
import { Card } from '../../components/Card';
import { addTooCart } from '../../redux/slicers/cartSlicer';
import ShopLayuot from './shop.layuot';
import Pagin from '../../components/Pagination';

import { useRouter } from 'next/router';
import { cardProps } from './dbSSprops';

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const props = await cardProps(query);

  return {
    props: { json: props },
    // will be passed to the page component as props
  };
  // if (req) {
  //   const cardsApiFetch = await apiFetch({ table: 'card', limit: 3, page: 0, all: true });
};
const Shpo = ({ json }) => {
  const { card, totalCount: totalCounts, client } = JSON.parse(json);
  const router = useRouter();
  console.log(JSON.parse(json));
  const style: useStylesType = useStyles();
  const dispatch = useDispatch();
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);
  const addTooCartHendl = React.useCallback((props) => dispatch(addTooCart(props)), []);

  const [page, setPage] = React.useState(+router.query.page || 1);

  const handleChange = React.useCallback((event, value) => {
    setPage(value);
    router.push({
      query: { page: value },
    });
  }, []);

  const limitLocal = 3;
  const count = Math.round(totalCounts / limitLocal);

  return (
    <ShopLayuot>
      <Grid container direction="row">
        {card.map((e) => (
          <Card cart={cart} key={e._id} card={e} addTooCartHendl={addTooCartHendl} />
        ))}
      </Grid>
      <Grid container direction="row" justify="center" alignContent="center">
        <Pagin page={page} handleChange={handleChange} count={count} />
      </Grid>
    </ShopLayuot>
  );
};

export default Shpo;
