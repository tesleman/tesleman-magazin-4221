import { Grid } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShopLayuot from '../shop.layuot';
import { useStyles, useStylesType } from '../styles/shop.style';
import { Card, Pagin, apiFetch, addTooCart, RootState, getCard } from '../shop.import-export';
import { SingleCategoryI } from '../shop-types';
export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  //@ts-ignore
  const categorys = query.slug.split('_').join(' ');

  const cards = await apiFetch({
    table: 'card',
    limit: 3,
    page: 0,
    all: true,
    category: categorys,
  });
  return {
    props: { context: categorys, cards: cards }, // will be passed to the page component as props
  };
};

const SingleCategory: React.FC<SingleCategoryI> = ({ context, cards }) => {
  console.log(context, cards, 'client');
  const style: useStylesType = useStyles();
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);
  const { entities, pageLenght, totalCount, error } = useSelector((state: RootState) => state.card);
  const limitLocal = 3;
  const [page, setPage] = React.useState(1);

  const count = Math.round((page !== 1 ? totalCount : cards.totalCount) / limitLocal);

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

export default SingleCategory;
