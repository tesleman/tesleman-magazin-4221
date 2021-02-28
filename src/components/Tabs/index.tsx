import { Paper, Tab, Tabs, Container, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Card } from '../Card';
import { TabItemInterface, TabsCentrType } from '../component-types';
import { AppDispatch, getCard, RootState } from '../import-export';
import { useStyles, useStylesType } from './tabs.style';

const TabsCentr: React.FC<{ categorys: Array<TabsCentrType>; cards: Array<TabItemInterface> }> = ({
  categorys,
  cards,
}) => {
  const style: useStylesType = useStyles();
  const [category, seCategory] = React.useState(categorys[0].title);
  const { entities, error } = useSelector((state: RootState) => state.card);
  const dispatch: AppDispatch = useDispatch();
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    seCategory(newValue);
  };

  React.useEffect(() => {
    const payload = {
      category: category,
      page: 0,
      limit: 3,
      table: 'card',
    };
    dispatch(getCard(payload));
  }, [category]);
  return (
    <div>
      <Container className={style.constainer}>asd</Container>
      <Paper>
        <Tabs
          value={category}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          centered>
          {categorys &&
            categorys.map((cat: TabsCentrType, i: number) => (
              <Tab key={cat._id} value={cat.title} label={cat.title} />
            ))}
        </Tabs>
      </Paper>
      <Container>
        <Grid container justify="center" direction="row">
          {entities && categorys[0].title !== category
            ? entities.map((e) => <Card key={e._id} {...e} />)
            : cards.map((e) => <Card key={e._id} {...e} />)}
        </Grid>
      </Container>
    </div>
  );
};

export default TabsCentr;
