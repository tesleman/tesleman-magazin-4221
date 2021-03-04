import { makeStyles, Theme } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    float: 'left',
    '& p': {
      paddingRight: 30,
    },
    '& span': {
      '& a': {
        color: 'black',
        textDecoration: 'none',
      },
      '& svg': {
        transform: 'translateY(7px)',
        color: theme.palette.secondary.main,
      },
    },
    '& address': {
      '& svg': {
        transform: 'translateY(7px)',
        color: theme.palette.secondary.main,
      },
    },
  },
  itemTytle: {
    transform: 'translateX(10px)',
    '&:before': {
      height: 16,
      width: 3,
      position: 'absolute',
      content: '""',
      zIndex: 2,
      background: theme.palette.secondary.main,
      transform: 'translate(-350%, 45%)',
    },
  },
  heart: {
    fontSize: 16,
    color: theme.palette.secondary.main,
  },
  botWrap: {
    textAlign: 'center',
    marginBottom: 50,
    marginTop: 50,
  },
  workTime: {
    listStyle: 'none',
    padding: 0,
    marginTop: 50,
  },
  aboute: {
    listStyle: 'none',
    padding: 0,
    marginTop: 50,
  },
  abouteLi: {
    transition: 'all .6s ease',
    '& a': {
      color: 'black',
      textDecoration: 'none',
      transition: 'all .6s ease',
    },
    '&:hover ': {
      transition: 'all .6s ease',
      '& a': {
        color: theme.palette.secondary.main,
        transition: 'all .6s ease',
      },
      color: theme.palette.secondary.main,
      transform: 'translateX(12px)',
      '&:before': {
        transition: 'all .6s ease',
        position: 'absolute',
        content: '">"',
        zIndex: 2,
        color: theme.palette.secondary.main,
        transform: ' translate(-150%, -2%)',
      },
    },
  },
}));
