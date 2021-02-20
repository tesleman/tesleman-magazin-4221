import { Paper, Tab, Tabs, Container, Grid } from '@material-ui/core';
import React from 'react';
import { TabItem } from './TabItem';

import { useStyles, useStylesType } from './tabs.style';

const TabsCentr: React.FC<{}> = ({}) => {
  const style: useStylesType = useStyles();
  const [value, setValue] = React.useState('asd');
  const [cards, setCards] = React.useState([]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    const cardFeching = async () => {
      const card = await fetch(`http://localhost:3000/api/card?limit=3&category=${value}`);
      const data = await card.json();
      setCards(data.data);
    };
    cardFeching();
  }, [value]);
  return (
    <div>
      <Container className={style.constainer}>asd</Container>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered>
          <Tab value="asd" label="asd" />
          <Tab value="4" label="4" />
          <Tab value="2" label="2" />
        </Tabs>
      </Paper>
      <Container>
        <Grid container justify="center" direction="row">
          {cards && cards.map((e) => <TabItem key={e._id} {...e} />)}
        </Grid>
      </Container>
    </div>
  );
};

export default TabsCentr;
