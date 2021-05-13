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
  Button,
} from '@material-ui/core';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CardScemaInterface } from '../../api/models/cardScema';

const Categoryes: React.FC<{
  categories: Array<CardScemaInterface>;
  count: number;
  slug: string;
  add_slug: string;
}> = ({ categories, slug, count, add_slug }) => {
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
  const onClickHeandler = () => {
    router.push(`${add_slug}`);
  };
  return (
    <>
      <Grid container justify="center">
        <Grid item xs={9}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Button onClick={onClickHeandler}>ADD</Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((row) => (
                  <TableRow key={row._id}>
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
