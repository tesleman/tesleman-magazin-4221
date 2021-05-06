import {
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Table,
  TablePagination,
  Grid,
  Typography,
} from '@material-ui/core';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { limitQery } from '../../../utils/ueryCheck';
import Category from '../../api/models/categoryScema';
import AdminNav from '../adminNav';

export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const pageOptions = {
    page: limitQery(query.page) | 0,
    limit: limitQery(query.count) | 5,
  };
  const categories = await Category.find({})
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit);
  const orderscountDocuments = await Category.find().countDocuments();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      ordersCount: orderscountDocuments,
    },
  };
};
const Catalog = ({ categories, ordersCount }) => {
  const router = useRouter();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    router.push({
      pathname: '/admin/catalog',
      query: { count: rowsPerPage, page: newPage },
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    router.push({
      pathname: '/admin/catalog',
      query: { count: event.target.value, page: 0 },
    });
    setPage(0);
  };
  return (
    <AdminNav>
      <Typography style={{ textAlign: 'center' }} variant="h3" component="h2" gutterBottom>
        Kategory
      </Typography>
      <Grid container justify="center">
        <Grid item xs={9}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>title</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((row) => (
                  <TableRow key={row.title}>
                    <TableCell align="left">
                      <Link href={`/admin/catalog/${row.slug}`}>
                        <a>{row.title}</a>
                      </Link>
                    </TableCell>
                  </TableRow>
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
        </Grid>
      </Grid>
    </AdminNav>
  );
};

export default Catalog;
