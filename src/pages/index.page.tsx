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
} from '../components/import-export';

import theme from '../theme';
import Blogs from './api/models/blogScema';
import Card, { CardScemaInterface } from './api/models/cardScema';
import Category, { CategoryBaseDocument } from './api/models/categoryScema';

interface propFcI {
  category: categoryI[];
  cards: cardInterface[];
  blogs: any;
  saleContdovnItem: cardInterface[];
}
const Home: React.FC<propFcI> = ({ category, cards, blogs, saleContdovnItem }) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const addTooCartHendl = React.useCallback((props) => dispatch(addTooCart(props)), []);

  if (!category && !cards) return <div> no data</div>;

  return (
    <div>
      <Slider />
      <TabsCentr addTooCartHendl={addTooCartHendl} cart={cart} categorys={category} cards={cards} />
      {!matches && (
        <CountDown addTooCartHendl={addTooCartHendl} cart={cart} card={saleContdovnItem[0]} />
      )}
      <Blog cards={blogs} />
      <Advantages />
    </div>
  );
};

export default Home;
interface propsI {
  props: {
    category: CategoryBaseDocument[];
    cards: CardScemaInterface[];
    blogs: any;
    saleContdovnItem: CardScemaInterface[];
  };
}

export async function getServerSideProps(): Promise<propsI> {
  try {
    const categorys: CategoryBaseDocument[] = await Category.find().limit(3).exec();

    const blogItem = await Blogs.find().limit(3).exec();
    const cardsApiFetch: CardScemaInterface[] = await Card.find();
    const saleItem = await Card.find({ sale: true });

    return {
      props: {
        category: JSON.parse(JSON.stringify(categorys)),
        cards: JSON.parse(JSON.stringify(cardsApiFetch)),
        blogs: JSON.parse(JSON.stringify(blogItem)),
        saleContdovnItem: JSON.parse(JSON.stringify(saleItem)),
      },
    };
  } catch (error) {
    return {
      props: {
        category: null,
        cards: null,
        blogs: null,
        saleContdovnItem: null,
      },
    };
  }
}
