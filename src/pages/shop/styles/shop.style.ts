import { makeStyles, Theme } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  imagin: {
    position: 'absolute',
    width: '100%',
    height: 430,
    zIndex: -1,
    '& :after': {
      position: 'absolute',
      content: "''",
      background: 'rgba(0,0,0,.3)',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 1,
    },
  },
  headerShop: {
    display: 'flex',
    height: 450,
    flex: 1,
  },
  price: {
    display: 'flex',
    alignItems: 'center',
    height: 35,
    '& h1': {
      paddingLeft: 15,
      margin: 0,
    },
  },
  wrapper: {
    color: 'white',
    margin: 'auto',
    '& h1': {
      textAlign: 'center',
      margin: 0,
    },
    '& a': {
      textDecoration: 'none',
      color: 'white',
    },
  },
  head: {},
  paginate: {
    background: 'gray',
  },
  imagePagination: {
    position: 'relative',

    padding: 7,
    cursor: 'pointer',
  },
  cardDetails: {
    float: 'left',
    paddingLeft: 50,
    '& h1': {
      color: theme.palette.secondary.main,
    },
  },
  input: {
    height: 25,
    width: 90,
    '& input': {
      padding: 8,
    },
  },
}));
