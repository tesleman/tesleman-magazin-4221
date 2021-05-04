import { GetServerSideProps } from 'next';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import Card from '../../api/models/cardScema';
import AdminNav from '../adminNav';
import { useRouter } from 'next/router';
import { limitQery } from '../../../utils/ueryCheck';

export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const pageOptions = {
    page: limitQery(query.page) | 0,
    limit: limitQery(query.count) | 5,
  };

  const cardBiCategory = await Card.find({ categoryslug: query.slug as string })
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit);
  const orderscountDocuments = await Card.find({
    categoryslug: query.slug as string,
  }).countDocuments();
  return {
    props: {
      cards: JSON.parse(JSON.stringify(cardBiCategory)),
      ordersCount: orderscountDocuments,
    },
  };
};

function CatalogSlug({ cards, ordersCount }) {
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
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>title</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((row) => (
              <TableRow key={row.title}>
                <TableCell align="left">
                  <Link href={`/admin/update/${row._id}`}>
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
      {/* <ul>
        {cards.map((item) => (
          <Link key={item._id} href={`/admin/update/${item._id}`}>
            <a>
              <li>{item.title}</li>
            </a>
          </Link>
        ))}
      </ul> */}
    </AdminNav>
  );
}

export default CatalogSlug;
