import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';

const Pagin = ({ handleChange, page, count }) => {
  return (
    <div>
      <Grid container direction="row" justify="center" alignContent="center">
        <Pagination
          variant="outlined"
          color="secondary"
          page={page}
          onChange={handleChange}
          count={count}
        />
      </Grid>
    </div>
  );
};

export default Pagin;
