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
import { limitQery } from '../../../utils/ueryCheck';
export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const pageOptions = {
    page: limitQery(query.page as string) | 0,
    limit: limitQery(query.count as string) | 5,
  };

  const orders = await Order.find({})
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit);
  const orderscountDocuments = await Order.find().countDocuments();
  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
      ordersCount: orderscountDocuments,
    },
  };
};

const Orders: React.FC<{ orders: Array<OrderScemaInterface>; ordersCount: number }> = ({
  orders,
  ordersCount,
}) => {
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
      query: { count: event.target.value, page: 0 },
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
