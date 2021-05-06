import { Paper, Tab, Tabs } from '@material-ui/core';
import React from 'react';
import AddEditCard from './AddEditCard';
import SeoTab from './seoTab';

const TabPanel = (props) => {
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

  React.useEffect(() => {
    console.log(value);
  }, [value]);
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
