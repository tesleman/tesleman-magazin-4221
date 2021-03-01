import React from 'react';

import { apiFechInterface, TabItemInterface } from '../components/component-types';

import { CountDown, Blog, Slider, TabsCentr } from '../components/import-export';
import { apiFetch } from '../redux/redux-api/redux-api';

export default function Home({ category, cards }) {
  return (
    <div>
      <Slider />

      <TabsCentr categorys={category} cards={cards} />
      <CountDown card={cards[0]} />
      <Blog cards={cards} />
    </div>
  );
}

Home.getInitialProps = async (ctx) => {
  const apiFetchCategoryParams: apiFechInterface = {
    page: 0,
    limit: 3,
    table: 'category',
  };
  const category = await apiFetch(apiFetchCategoryParams);

  const cardsApiFetchParams: apiFechInterface = {
    page: 0,
    limit: 3,
    table: 'card',
  };
  const cardsApiFetch: Array<TabItemInterface> = await apiFetch(cardsApiFetchParams);

  return { category: category, cards: cardsApiFetch };
};
