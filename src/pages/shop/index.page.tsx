import React from 'react';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';

import { Container, Grid } from '@material-ui/core';
import { useStyles, useStylesType } from './styles/shop.style';
import { apiFetch } from '../../redux/redux-api/redux-api';
import { RootState } from '../../redux/store';
import { Card } from '../../components/Card';
import { addTooCart } from '../../redux/slicers/cartSlicer';
import { getCard } from '../../redux/slicers/cardSlice';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cardsApiFetch = await apiFetch({ table: 'card', limit: 3, page: 0, all: true });

  return {
    props: {
      cards: cardsApiFetch,
    }, // will be passed to the page component as props
  };
};
const Shpo = ({ cards }) => {
  const style: useStylesType = useStyles();
  const dispatch = useDispatch();
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);
  const { entities, pageLenght, totalCount, error } = useSelector((state: RootState) => state.card);
  const addTooCartHendl = React.useCallback((props) => dispatch(addTooCart(props)), []);
  console.log(entities);
  const [page, setPage] = React.useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const limitLocal = 3;
  const count = Math.round(totalCount / limitLocal);

  console.log(count);
  React.useEffect(() => {
    dispatch(getCard({ table: 'card', limit: limitLocal, page: page - 1, all: true }));

    return () => {};
  }, [page]);

  return (
    <div>
      <div className={style.imagin}>
        <Image src="/shop-1.jpg" layout="fill" objectFit="fill" objectPosition="top" />
      </div>
      <Container className={style.root}>
        <div className={style.headerShop}>
          <h1>SHOP</h1>
        </div>
        <div className={style.head}>
          <Grid container>
            <Grid item xs={6}>
              Showing 1–12 of 76 results
            </Grid>
            <Grid item xs={6}>
              Фильтр
            </Grid>
          </Grid>
          <Grid container direction="row">
            {entities &&
              entities.map((e) => (
                <Card cart={cart} key={e._id} card={e} addTooCartHendl={addTooCartHendl} />
              ))}
          </Grid>
          <div className={style.paginate}>
            <Pagination page={page} onChange={handleChange} count={count} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shpo;
