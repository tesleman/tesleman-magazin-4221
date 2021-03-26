import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Grid,
  Typography,
  Avatar,
  TableRow,
} from '@material-ui/core';
import Image from 'next/image';
import { useStyles } from './style.cart';

import { formUserdataI } from '../pages_type';
import { cartInterface } from '../pages_import_export';

const FinailStage: React.FC<{ userData: formUserdataI; cart: Array<cartInterface> }> = ({
  userData,
  cart,
}) => {
  const style = useStyles();

  const avatar = userData !== null ? userData.name.split('')[0].toUpperCase() : '';

  if (!cart) return <div>...loading</div>;
  if (!userData) return <div>No Data</div>;
  return (
    <div className={style.roots}>
      <h1 className={style.dataH1Srtyle}>Your Data</h1>
      <Paper className={style.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid className={style.avatarStyle} item>
            <Avatar>{avatar}</Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>Name: {userData.name}</Typography>
            <Typography noWrap>Email: {userData.email}</Typography>
            <Typography noWrap>Phone: {userData.phone}</Typography>
          </Grid>
        </Grid>
      </Paper>
      <TableContainer component={Paper}>
        <Table className={style.table} aria-label="caption table">
          <caption>A basic table example with a caption</caption>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Count</TableCell>
              <TableCell align="right">TotalPrice</TableCell>
              <TableCell align="right">artikul</TableCell>
              <TableCell align="right">Image</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((row: cartInterface) => (
              <TableRow key={row._id}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.count}</TableCell>
                <TableCell align="right">{row.totalPrice}</TableCell>
                <TableCell align="right">{row.artikul}</TableCell>
                <TableCell align="right">
                  {row.images.length > 0 ? (
                    <Image src={row.images[0]} width={50} height={50} />
                  ) : (
                    ''
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FinailStage;
