import React from 'react';
import { GetServerSideProps } from 'next';
import { useSelector, useDispatch } from 'react-redux';

import { Grid } from '@material-ui/core';
import { useStyles, useStylesType } from './styles/shop.style';
import { apiFetch } from '../../redux/redux-api/redux-api';
import { RootState } from '../../redux/store';
import { Card } from '../../components/Card';
import { addTooCart } from '../../redux/slicers/cartSlicer';
import { getCard } from '../../redux/slicers/cardSlice';
import ShopLayuot from './shop.layuot';
import Pagin from '../../components/Pagination';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cardsApiFetch = await apiFetch({ table: 'card', limit: 3, page: 0, all: true });

  return {
    props: cardsApiFetch,
    // will be passed to the page component as props
  };
};
const Shpo = ({ data }) => {
  console.log(data);
  const style: useStylesType = useStyles();
  const dispatch = useDispatch();
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);
  const { entities, pageLenght, totalCount, error } = useSelector((state: RootState) => state.card);
  const addTooCartHendl = React.useCallback((props) => dispatch(addTooCart(props)), []);

  const [page, setPage] = React.useState(1);

  const handleChange = React.useCallback((event, value) => {
    setPage(value);
  }, []);
  const limitLocal = 3;
  const count = Math.round(totalCount / limitLocal);

  console.log(count);
  React.useEffect(() => {
    if (page !== 1)
      dispatch(getCard({ table: 'card', limit: limitLocal, page: page - 1, all: true }));
    return () => {};
  }, [page]);

  return (
    <ShopLayuot>
      <Grid container direction="row">
        {page !== 1
          ? entities.map((e) => (
              <Card cart={cart} key={e._id} card={e} addTooCartHendl={addTooCartHendl} />
            ))
          : data.map((e) => (
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
