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

interface propFcI {
  category: categoryI[];
  cards: cardInterface[];
}
const Home: React.FC<propFcI> = ({ category, cards }) => {
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
      <Blog cards={cards} />
      <Advantages />
    </div>
  );
};

export default Home;
interface propsI {
  props: {
    category: categoryI[];
    cards: cardInterface[];
  };
}

export async function getStaticProps(): Promise<propsI> {
  try {
    const apiFetchCategoryParams: apiFechInterface = {
      table: 'category',
    };
    const categorys: cardInterface[] = await apiFetch(apiFetchCategoryParams);
    console.log(categorys);
    const cardsApiFetchParams: apiFechInterface = {
      page: 0,
      limit: 3,
      table: 'card',
    };
    const cardsApiFetch: cardInterface[] = await apiFetch(cardsApiFetchParams);
    if (!cardsApiFetch || !categorys) {
      return {
        props: {
          category: [],
          cards: [],
        },
      };
    }

    return { props: { category: categorys, cards: cardsApiFetch } };
  } catch (error) {
    return {
      props: {
        category: null,
        cards: null,
      },
    };
  }
}
