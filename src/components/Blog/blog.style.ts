import { makeStyles, Theme } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme: Theme) => ({
  rootroot: {},
  root: {
    position: 'relative',
    transition: 'all .5s ease',
    '&:hover $span': {
      width: 50,
      height: 50,
      transition: 'all .5s ease',
      visibility: 'visible',
      opacity: 1,
      '&:after': {
        transition: 'all .5s ease',
        transform: 'translateY(50%)',
        visibility: 'visible',
        opacity: 1,
      },
      '&:before': {
        transform: 'translateX(50%)',
        transition: 'all .5s ease',
        visibility: 'visible',
        opacity: 1,
      },
    },
    '&:hover': {
      '&:before': {
        position: 'absolute',
        content: "''",
        background: 'rgba(0,0,0,.3)',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1,
        transition: 'all .5s ease',
      },
    },
  },
  span: {
    width: 100,
    height: 100,
    borderRadius: '50%',
    display: 'block',
    position: 'absolute',
    left: '50%',
    top: '50%',
    border: '1px solid white',
    transform: 'translate(-50%,-50%)',
    transition: 'all .5s ease',
    visibility: 'hidden',
    opacity: 0,
    '&:before': {
      transform: 'translateX(-50%)',
      background: 'white',
      position: 'absolute',
      width: 25,
      height: 1,
      content: '""',
      top: '50%',
      transition: 'all .5s ease',
      visibility: 'hidden',
      opacity: 0,
    },
    '&:after': {
      transform: 'translateY(-50%)',
      background: 'white',
      position: 'absolute',
      width: 1,
      height: 25,
      content: '""',
      left: '50%',
      transition: 'all .5s ease',
      visibility: 'hidden',
      opacity: 0,
    },
  },
  postAnons: {
    padding: 35,
    margin: '15px 0',

    background: 'white',
    zIndex: 4,
    '&:hover': {
      boxShadow: '0px 6px 20px rgb(0 0 0 / 65%)',
    },

    '& p': {
      marginBottom: 30,
      ' -webkit-line-clamp': 3 /* Число отображаемых строк */,
      display: '-webkit-box' /* Включаем флексбоксы */,
      '-webkit-box-orient': 'vertical' /* Вертикальная ориентация */,
      overflow: 'hidden' /* Обрезаем всё за пределами блока */,
    },
  },
  button: {
    padding: '8px 15px',
    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
}));
