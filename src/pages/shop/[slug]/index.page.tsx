import { Grid } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles, useStylesType } from '../styles/shop.style';
import { Card, Pagin, addTooCart, RootState, Layuot, cardInterface } from '../shop.import-export';

import { useRouter } from 'next/router';
import { cardProps } from '../../../utils/dbprops';
import { CategoryBaseDocument } from '../../api/models/categoryScema';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const props = await cardProps(query);

  return {
    props: JSON.parse(props),
    // will be passed to the page component as props
  };
};

export interface propsI {
  totalCount: number;
  card: Array<cardInterface>;
  category: CategoryBaseDocument;
}

const SingleCategory: React.FC<propsI> = (props) => {
  console.log(props);
  const { totalCount, card, category } = props;

  const style: useStylesType = useStyles();
  const { cart } = useSelector((state: RootState) => state.cart);
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
  const tooCount = card.length > 0 ? fromeCount + card.length - 1 : 0;
  return (
    <Layuot
      category={category.title}
      frome={fromeCount}
      too={tooCount}
      all={count}
      filte
      baseCategory={{ category: 'Shop', link: '/shop' }}
    >
      <Head>
        <title>{category.seo.meta_title}</title>.
        <meta name="description" content={category.seo.meta_description} />
        <meta name="keywords" content={category.seo.meta_keywords} />
      </Head>
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
