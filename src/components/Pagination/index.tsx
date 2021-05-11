import { Grid } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';

const Pagin: React.FC<{ handleChange: () => void; page: number; count: number }> = ({
  handleChange,
  page,
  count,
}) => {
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
