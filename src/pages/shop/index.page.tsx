import React from 'react';
import { GetServerSideProps } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import { useStyles, useStylesType } from './styles/shop.style';

import { RootState } from '../../redux/store';
import { Card } from '../../components/Card';
import { addTooCart } from '../../redux/slicers/cartSlicer';

import Pagin from '../../components/Pagination';

import { useRouter } from 'next/router';
import { cardProps } from '../../utils/dbprops';
import { Layuot } from './shop.import-export';
import { propsI } from './[slug]/index.page';
import { qerySorteHendler, qeryTextHendler } from '../../utils/ueryCheck';

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const props = await cardProps(query);

  return {
    props: { json: props },
    // will be passed to the page component as props
  };
  // if (req) {
  //   const cardsApiFetch = await apiFetch({ table: 'card', limit: 3, page: 0, all: true });
};
const Shpo: React.FC<{ json: string }> = ({ json }) => {
  const { card, totalCount: totalCounts }: propsI = JSON.parse(json);
  const router = useRouter();

  const style: useStylesType = useStyles();
  const dispatch = useDispatch();
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);
  const addTooCartHendl = React.useCallback((props) => dispatch(addTooCart(props)), []);

  const [page, setPage] = React.useState(+router.query.page || 1);

  const handleChange = (event, value) => {
    setPage(value);
    router.push(
      {
        query: {
          page: value,
          ...qeryTextHendler(router),
          ...qerySorteHendler(router),
        },
      },
      undefined,
      { scroll: false },
    );
  };

  const limitLocal = 3;
  const count = Math.ceil(totalCounts / limitLocal);
  const fromeCount = page * limitLocal - limitLocal + 1;
  const tooCount = fromeCount + card.length - 1;
  return (
    <Layuot
      filte
      category="Shop"
      frome={fromeCount}
      too={tooCount}
      all={totalCounts}
      baseCategory={{ category: 'Shop', link: '/shop' }}
    >
      <>
        <Head>
          <title>Shop</title>.
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Head>
        <Grid container direction="row">
          {card.map((e) => (
            <Card
              gridxs={12}
              gridsm={6}
              gridmd={3}
              cart={cart}
              key={e._id}
              card={e}
              addTooCartHendl={addTooCartHendl}
            />
          ))}
        </Grid>
        <Grid container direction="row" justify="center" alignContent="center">
          <Pagin page={+router.query.page || 1} handleChange={handleChange} count={count} />
        </Grid>
      </>
    </Layuot>
  );
};

export default Shpo;
