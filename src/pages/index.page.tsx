import { useMediaQuery } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cardInterface, categoryI } from '../components/component-types';
import {
  CountDown,
  Blog,
  Slider,
  TabsCentr,
  Advantages,
  addTooCart,
  RootState,
  apiFechInterface,
} from '../components/import-export';
import { apiFetch } from '../redux/redux-api/redux-api';
import theme from '../theme';
import Blogs from './api/models/blogScema';

interface propFcI {
  category: categoryI[];
  cards: cardInterface[];
  blogs: any;
}
const Home: React.FC<propFcI> = ({ category, cards, blogs }) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const addTooCartHendl = React.useCallback((props) => dispatch(addTooCart(props)), []);

  if (!category && !cards) return <div> no data</div>;

  return (
    <div>
      <Slider />
      <TabsCentr addTooCartHendl={addTooCartHendl} cart={cart} categorys={category} cards={cards} />
      {!matches && <CountDown addTooCartHendl={addTooCartHendl} cart={cart} card={cards[0]} />}
      <Blog cards={blogs} />
      <Advantages />
    </div>
  );
};

export default Home;
interface propsI {
  props: {
    category: categoryI[];
    cards: cardInterface[];
    blogs: any;
  };
}

export async function getServerSideProps(): Promise<propsI> {
  try {
    const apiFetchCategoryParams: apiFechInterface = {
      table: 'category',
    };
    const categorys: cardInterface[] = await apiFetch(apiFetchCategoryParams);

    const cardsApiFetchParams: apiFechInterface = {
      page: 0,
      limit: 3,
      table: 'card',
    };
    const blogItem = await Blogs.find().limit(3).exec();
    const cardsApiFetch: cardInterface[] = await apiFetch(cardsApiFetchParams);

    return { props: { category: categorys, cards: cardsApiFetch, blogs: blogItem } };
  } catch (error) {
    return {
      props: {
        category: null,
        cards: null,
        blogs: null,
      },
    };
  }
}
