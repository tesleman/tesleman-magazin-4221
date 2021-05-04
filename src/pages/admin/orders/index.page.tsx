import React from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Order, { OrderScemaInterface } from '../../api/models/ordersScema';
import AdminNav from '../adminNav';
import Row from './Row';
export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const limitQery = (query) => {
    const nan = Number(query.count);
    if (!Number.isNaN(nan)) {
      return nan;
    }
    return 5;
  };

  const pageOptions = {
    page: parseInt(query.page as string, 10) || 0,
    limit: limitQery(query),
  };

  const orders = await Order.find({})
    .skip(pageOptions.page * pageOptions.limit)
    .limit(limitQery(query));
  const orderscountDocuments = await Order.find().countDocuments();
  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
      ordersCount: orderscountDocuments,
    },
  };
};

const Orders = ({ orders, ordersCount }) => {
  const router = useRouter();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    router.push({
      pathname: '/admin/orders',
      query: { count: rowsPerPage, page: newPage },
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    router.push({
      pathname: '/admin/orders',
      query: { count: event.target.value, page: page },
    });
    setPage(0);
  };
  return (
    <AdminNav>
      <Container>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order: OrderScemaInterface) => (
                <Row key={order._id} order={order} />
              ))}
            </TableBody>
          </Table>
          <div>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={ordersCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </TableContainer>
      </Container>
    </AdminNav>
  );
};

export default Orders;
