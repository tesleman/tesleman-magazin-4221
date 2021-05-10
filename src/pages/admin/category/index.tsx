import React from 'react';
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
import Link from 'next/link';
import { useRouter } from 'next/router';

const Categoryes = ({ categories, slug, count }) => {
  const router = useRouter();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    router.push({
      pathname: `/admin/`,
      query: { count: rowsPerPage, page: newPage },
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    router.push({
      pathname: `/admin/${slug}`,
      query: { count: event.target.value, page: 0 },
    });
    setPage(0);
  };
  return (
    <>
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
                      <Link href={`/admin/${slug}/${row.slug}`}>
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
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </div>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default Categoryes;
