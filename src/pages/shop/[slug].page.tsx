import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { NextPageContext, GetServerSideProps } from 'next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCard } from '../../redux/slicers/cardSlice';
import { RootState } from '../../redux/store';
import ShopLayuot from './shop.layuot';
import { Card } from '../../components/Card';
import { useStyles, useStylesType } from './styles/shop.style';
import { addTooCart } from '../../components/import-export';
import { apiFetch } from '../../redux/redux-api/redux-api';
import Pagin from '../../components/Pagination';

export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  //@ts-ignore
  const categorys = query.slug.split('_').join(' ');

  if (req) {
    const cards = await apiFetch({
      table: 'card',
      limit: 3,
      page: 0,
      all: true,
      category: categorys,
    });
    return {
      props: { context: categorys, cards: cards, client: false }, // will be passed to the page component as props
    };
  }
  if (!req) {
    return {
      props: { client: true }, // will be passed to the page component as props
    };
  }
};
const SingleCard = ({ context, cards, client = true }) => {
  console.log(context, cards, client, 'client');
  const style: useStylesType = useStyles();
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);
  const { entities, pageLenght, totalCount, error } = useSelector((state: RootState) => state.card);
  const limitLocal = 3;

  const count = Math.round(client ? totalCount : cards.totalCount / limitLocal);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  const handleChange = React.useCallback((event, value) => {
    setPage(value);
  }, []);
  const addTooCartHendl = React.useCallback((props) => dispatch(addTooCart(props)), []);

  React.useEffect(() => {
    if (page !== 1) {
      const category = context.split('_').join(' ');

      dispatch(
        getCard({
          table: 'card',
          limit: limitLocal,
          page: page - 1,
          all: true,
          category: category,
        }),
      );
      console.log(totalCount);
    }
    return () => {};
  }, [page]);
  return (
    <ShopLayuot>
      <Grid container direction="row">
        {page !== 1
          ? entities.map((e) => (
              <Card cart={cart} key={e._id} card={e} addTooCartHendl={addTooCartHendl} />
            ))
          : cards.data.map((e) => (
              <Card cart={cart} key={e._id} card={e} addTooCartHendl={addTooCartHendl} />
            ))}
      </Grid>
      <Grid container direction="row" justify="center" alignContent="center">
        <Pagin page={page} handleChange={handleChange} count={count} />
      </Grid>
    </ShopLayuot>
  );
};

export default SingleCard;
