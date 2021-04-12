import { makeStyles, Theme } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme: Theme) => ({
  nav: {
    zIndex: 555,
    position: 'fixed',
    top: 0,

    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid rgba(215, 215, 215, .5)',
    boxShadow: '0px 5px 12px rgb(101 95 95 / 50%)',
    background: 'white',
  },
  ulRoot: {
    zIndex: 555,
    cursor: 'pointer',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    flexDirection: 'row',
    background: 'white',
  },
  ulli: {
    position: 'relative',
    listStyle: 'none',
    background: 'white',
    '& a': {
      color: 'black',
      textDecoration: 'none',
    },
    '&:hover $li': {
      opacity: 1,
      visibility: 'visible',
    },
    '&:hover $navulliul ': {
      opacity: 1,
      visibility: 'visible',
    },
  },
  li: {
    background: 'white',
    padding: 15,

    '& :hover': {
      color: theme.palette.secondary.main,
      transform: 'translateX(5px)',
      transition: 'all .5s ease',
    },
  },
  navulliul: {
    background: 'white',
    opacity: 0,
    transition: '.5s',
    zIndex: 0,
    display: 'block',
    listStyle: 'none',
    padding: 0,
    position: 'absolute',
    boxShadow: '0 2px 5px rgba(0,0,0, .5)',
    marginTop: 16,
    visibility: 'hidden',
  },

  HeadercartRoot: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeadercartIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  sideMenueLink: {
    color: 'black',
    textDecoration: 'none',
  },
  buttonNav: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 0,
  },
  button: {
    padding: 15,
  },
  catalogText: {
    textAlign: 'left',
    padding: 5,
    [theme.breakpoints.only('xs')]: {
      fontSize: '10px',
    },
  },
  ListItem: {
    padding: '10px 15px',
  },
}));
