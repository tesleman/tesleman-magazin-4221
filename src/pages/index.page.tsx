import { NextPageContext } from 'next';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cardInterface } from '../components/component-types';
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

export default function Home({ category, cards }) {
  const { cart, totalCartPrice } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const addTooCartHendl = React.useCallback((props) => dispatch(addTooCart(props)), []);
  if (!category && !cards) return <div> no data</div>;

  return (
    <div>
      <Slider />
      <TabsCentr addTooCartHendl={addTooCartHendl} cart={cart} categorys={category} cards={cards} />
      <CountDown addTooCartHendl={addTooCartHendl} cart={cart} card={cards[0]} />
      <Blog cards={cards} />
      <Advantages />
    </div>
  );
}

export async function getStaticProps(ctx: NextPageContext) {
  try {
    const apiFetchCategoryParams: apiFechInterface = {
      table: 'category',
    };
    const category = await apiFetch(apiFetchCategoryParams);

    const cardsApiFetchParams: apiFechInterface = {
      page: 0,
      limit: 3,
      table: 'card',
    };
    const cardsApiFetch: Array<cardInterface> = await apiFetch(cardsApiFetchParams);
    return { props: { category: category, cards: cardsApiFetch } };
  } catch (error) {
    return { props: {} };
  }
}
