import { Paper, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import { CardScemaInterface } from '../../api/models/cardScema';
import AddEditCard from './AddEditCard';
import SeoTab from './seoTab';

const TabPanel: React.FC<CardScemaInterface> = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const currentTab = (value) => {
    switch (value) {
      case 0:
        return <AddEditCard {...props} />;

      case 1:
        return <SeoTab {...props} />;

      default:
        break;
    }
  };

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Item One" />
        {props._id && <Tab label="Item Two" />}
      </Tabs>
      <>{currentTab(value)}</>
    </Paper>
  );
};

export default TabPanel;
