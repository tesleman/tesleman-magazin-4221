import { makeStyles, Theme } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  imagin: {
    position: 'absolute',
    width: '100%',
    height: 430,
    zIndex: -1,
    marginTop: 54,
    [theme.breakpoints.down('md')]: {
      height: 300,
    },
    [theme.breakpoints.down('xs')]: {
      visibility: 'hidden',
    },

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
  wrapper: {
    color: 'white',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      color: 'black',
    },
    '& h1': {
      textAlign: 'center',
      margin: 0,
    },
    '& a': {
      textDecoration: 'none',
      color: 'white',
      [theme.breakpoints.down('xs')]: {
        color: 'black',
      },
    },
  },
  filterWraapper: {
    marginTop: 54,
  },
}));
