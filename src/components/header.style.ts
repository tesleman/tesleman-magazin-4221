import { makeStyles } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme) => ({
  nav: {
    position: 'relative',
    float: 'right',
    width: '100%',
    textAlign: 'center',
    borderBottom: '1px solid rgba(215, 215, 215, .5)',
    boxShadow: '0px 5px 12px rgb(101 95 95 / 50%)',
  },
  ulRoot: {
    cursor: 'pointer',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    flexDirection: 'row',
  },
  ulli: {
    padding: 15,
    position: 'relative',
    listStyle: 'none',
    '& a': {
      color: 'black',
      textDecoration: 'none',
    },
    '&:hover $li': {
      opacity: 1,
      visibility: 'visible',
    },
    '&:hover $navulliul': {
      opacity: 1,
      visibility: 'visible',
    },
  },
  li: {
    padding: 15,
    // display: 'none',
  },
  navulliul: {
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
}));
