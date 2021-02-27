import React from 'react';
import { TabItemInterface } from '../components/component-types';

import { Header, Slider, TabsCentr } from '../components/import-export';
import { apiFetch } from '../redux/redux-api/redux-api';

export default function Home({ category, cards }) {
  return (
    <div>
      <Header />

      <Slider />
      <TabsCentr categorys={category} cards={cards} />
    </div>
  );
}

Home.getInitialProps = async (ctx) => {
  const apiFetchCategoryParams = {
    page: 0,
    limit: 3,
    table: 'category',
  };
  const category = await apiFetch(apiFetchCategoryParams);

  const cardsApiFetchParams = {
    page: 0,
    limit: 3,
    table: 'card',
  };
  const cardsApiFetch: Array<TabItemInterface> = await apiFetch(cardsApiFetchParams);

  return { category: category, cards: cardsApiFetch };
};
