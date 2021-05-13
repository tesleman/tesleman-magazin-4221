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
  Grid,
  Typography,
  FormControlLabel,
  Switch,
} from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import Card, { CardScemaInterface } from '../../api/models/cardScema';
import AdminNav from '../adminNav';
import { useRouter } from 'next/router';
import { limitQery } from '../../../utils/ueryCheck';
import { useForm } from 'react-hook-form';
import Category from '../../api/models/categoryScema';

export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const currentCategory = await Category.findOne({ slug: query.slug as string });
  const title = query.title;
  const regex = new RegExp(`${title}`);

  const pageOptions = {
    page: limitQery(query.page as string) || 0,
    limit: limitQery(query.count as string) || 5,
    title: query.title !== undefined ? regex : '',
    artikul: query.artikul || '',
    categoryId: currentCategory._id,
    categoryslug: query.slug as string,
    all: query.all,
  };

  const qeryFunck = (pageOptions) => {
    if (pageOptions.all === 'true') {
      return {};
    }
    if (!pageOptions.title && !pageOptions.artikul) {
      return { $and: [{ categoryId: pageOptions.categoryId }] };
    }
    if (!pageOptions.title && pageOptions.artikul) {
      return {
        $and: [
          { categoryId: pageOptions.categoryId as string },
          { artikul: pageOptions.artikul as string },
        ],
      };
    }
    if (pageOptions.title && !pageOptions.artikul) {
      return {
        $and: [
          { categoryId: pageOptions.categoryId as string },
          { title: { $regex: pageOptions.title } },
        ],
      };
    }
    if (pageOptions.title && pageOptions.artikul) {
      return {
        $and: [
          { categoryId: pageOptions.categoryId as string },
          { title: { $regex: pageOptions.title } },
          { artikul: pageOptions.artikul as string },
        ],
      };
    }
  };

  const cardBiCategory = await Card.find(qeryFunck(pageOptions))
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit);

  const orderscountDocuments = await Card.find(qeryFunck(pageOptions)).countDocuments();

  return {
    props: {
      cards: JSON.parse(JSON.stringify(cardBiCategory)),
      ordersCount: orderscountDocuments,
    },
  };
};

const CatalogSlug: React.FC<{ cards: Array<CardScemaInterface>; ordersCount: number }> = ({
  cards,
  ordersCount,
}) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const [page, setPage] = React.useState(Number(router.query.page) || 0);
  const [chece, setChece] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    router.push({
      pathname: '/admin/catalog/[slug]',
      query: { slug: router.query.slug, count: rowsPerPage, page: newPage },
    });
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    router.push({
      pathname: '/admin/catalog/[slug]',
      query: { slug: router.query.slug, count: event.target.value, page: 0 },
    });
    setPage(0);
  };

  interface dataInterface {
    artikul?: string;
    title?: string;
  }
  const qeryRouterFunclk = (data: dataInterface) => {
    if (data.title && !data.artikul) {
      return { title: data.title };
    }
    if (!data.title && data.artikul) {
      return { artikul: data.artikul };
    }
    if (data.title && data.artikul) {
      return { artikul: data.artikul, title: data.title };
    }
  };
  const handleSubmitFilterForm = (data: dataInterface) => {
    router.push({
      pathname: '/admin/catalog/[slug]',
      query: { slug: router.query.slug, count: rowsPerPage, page: page, ...qeryRouterFunclk(data) },
    });
  };

  const setCheceHEandlerChange = () => {
    setChece((prevState) => (prevState = !prevState));
    router.push({
      pathname: '/admin/catalog/[slug]',
      query: {
        all: !chece,
        slug: router.query.slug,
        count: rowsPerPage,
        page: page,
      },
    });
  };

  return (
    <AdminNav>
      <Typography style={{ textAlign: 'center' }} variant="h3" component="h2" gutterBottom>
        Категория
      </Typography>

      <Grid container direction="column" justify="flex-start">
        <form action="" onSubmit={handleSubmit(handleSubmitFilterForm)}>
          <Grid container direction="column" justify="center">
            <label htmlFor="meta_title">
              <input ref={register} type="text" name="title" multiple />
              title
            </label>
            <label htmlFor="meta_title">
              <input ref={register} type="text" name="artikul" multiple />
              Artikul
            </label>
            <FormControlLabel
              onChange={setCheceHEandlerChange}
              label="All"
              labelPlacement="end"
              value={chece}
              control={<Switch color="primary" />}
            />
          </Grid>
          <button style={{ width: '10%' }} type="submit">
            submit
          </button>
        </form>

        <Grid item xs={9}>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>title</TableCell>
                  <TableCell>Artikul</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cards.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell align="left">
                      <Link href={`/admin/update/${row._id}`}>
                        <a>{row.title}</a>
                      </Link>
                    </TableCell>
                    <TableCell align="left">{row.artikul}</TableCell>
                    <TableCell align="left">{row.active ? 'true' : 'false'}</TableCell>
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

export default CatalogSlug;
