import React from 'react';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const Row = (props) => {
  const { order } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {order.person.name}
        </TableCell>
        <TableCell align="right">{order.person.email}</TableCell>
        <TableCell align="right">{order.person.phone}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Order
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>title</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Count</TableCell>
                    <TableCell align="right">Artikul</TableCell>
                    <TableCell align="right">Total Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.order.map((orderItem) => (
                    <TableRow key={orderItem._id}>
                      <TableCell component="th" scope="row">
                        {orderItem.title}
                      </TableCell>

                      <TableCell align="right">{orderItem.price}</TableCell>
                      <TableCell align="right">{orderItem.count}</TableCell>
                      <TableCell align="right">{orderItem.artikul}</TableCell>
                      <TableCell align="right">{orderItem.totalPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default Row;
