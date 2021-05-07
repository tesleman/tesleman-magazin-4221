import { Paper, Tab, Tabs, Container, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Card } from '../Card';
import { cardInterface, categoryI, TabsCentrType } from '../component-types';
import { apiFechInterface, AppDispatch, getCard, RootState } from '../import-export';
import { useStyles, useStylesType } from './tabs.style';

const TabsCentr: React.FC<{
  addTooCartHendl: (payload: cardInterface) => void;
  categorys: Array<categoryI>;
  cards: Array<cardInterface>;
  cart: Array<cardInterface>;
}> = ({ categorys, cards, addTooCartHendl, cart }) => {
  const style: useStylesType = useStyles();
  const [category, seCategory] = React.useState(categorys[0]?.title);
  const { entities } = useSelector((state: RootState) => state.card);
  const dispatch: AppDispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<{ any }>, newValue: string): void => {
    seCategory(newValue);
  };

  React.useEffect(() => {
    const payload: apiFechInterface = {
      categoryId: categorys.find((i) => i.title === category)._id,
      page: 0,
      limit: 3,
      table: 'card',
      all: true,
    };

    dispatch(getCard(payload));
  }, [category, dispatch]);
  return (
    <div>
      <Container className={style.constainer}>asd</Container>
      <Paper>
        <Tabs
          value={category}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          centered
        >
          {categorys &&
            categorys.slice(0, 3).map((cat: TabsCentrType) => (
              // eslint-disable-next-line no-underscore-dangle
              <Tab key={cat._id} value={cat.title} label={cat.title} />
            ))}
        </Tabs>
      </Paper>
      <Container>
        <Grid container justify="center" direction="row">
          {entities && categorys[0]?.title !== category
            ? entities.map((e: cardInterface) => (
                <Card cart={cart} key={e._id} card={e} addTooCartHendl={addTooCartHendl} />
              ))
            : cards.map((e: cardInterface) => (
                <Card cart={cart} key={e._id} card={e} addTooCartHendl={addTooCartHendl} />
              ))}
        </Grid>
      </Container>
    </div>
  );
};

export default TabsCentr;
