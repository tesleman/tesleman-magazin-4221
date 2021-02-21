import { Paper, Tab, Tabs, Container, Grid } from '@material-ui/core';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCard } from '../../redux/slicers/cardSlice';
import { RootState } from '../../redux/store';

import { Card } from '../Card';
import { useStyles, useStylesType } from './tabs.style';

const TabsCentr: React.FC<{}> = ({}) => {
  const style: useStylesType = useStyles();
  const [value, setValue] = React.useState('asd');
  const [cards, setCards] = React.useState([]);
  const { entities, error } = useSelector((state: RootState) => state.card);
  const dispatch: AppDispatch = useDispatch();
  console.log(entities);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    dispatch(getCard(value));
  }, [value]);
  return (
    <div>
      <Container className={style.constainer}>asd</Container>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="primary"
          centered>
          <Tab value="asd" label="asd" />
          <Tab value="4" label="4" />
          <Tab value="2" label="2" />
        </Tabs>
      </Paper>
      <Container>
        <Grid container justify="center" direction="row">
          {entities && entities.map((e) => <Card key={e._id} {...e} />)}
        </Grid>
      </Container>
    </div>
  );
};

export default TabsCentr;
