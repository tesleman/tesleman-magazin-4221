import { makeStyles, Theme } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme: Theme) => ({
  constainer: {
    textAlign: 'center',

    margin: 38,
    padding: '0 40px',
    position: 'relative',
    cursor: 'pointer',
    boxShadow: '2px 3px 15px rgb(0 0 0 / 40%)',
    '&:hover': {
      boxShadow: '0px 6px 20px rgb(0 0 0 / 65%)',
      '& $sideItem': {
        visibility: 'visible',
        transform: 'translate(-10px, -50px)',
        opacity: 1,
      },
    },
    '& h4': {
      margin: 0 /* Убираем внешний отступ */,
      ' -webkit-line-clamp': 3 /* Число отображаемых строк */,
      display: '-webkit-box' /* Включаем флексбоксы */,
      '-webkit-box-orient': 'vertical' /* Вертикальная ориентация */,
      overflow: 'hidden' /* Обрезаем всё за пределами блока */,
    },
  },
  sideItem: {
    display: 'flex',
    flexDirection: 'column',
    opacity: 0,
    transition: 'all .5s ease',
    position: 'absolute',
    top: '50%',
    right: '0',
    transform: 'translate(50px, -50px)',
    visibility: 'hidden',

    '& svg': {
      background: ' rgb(60 58 58 / 20%)',
      marginBottom: 5,
      width: 40,
      height: 40,
      padding: 8,
      borderRadius: '50%',
      '&:hover': {
        background: 'rgb(0 0 0 / 40%)',
        cursor: 'pointer',
      },
    },
  },
  modal: {
    position: 'absolute',
    maxWidth: 800,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    left: '20%',
    top: '20%',
  },
  modaContent: {
    marginLeft: 35,
  },
  dots: {
    height: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 5,
  },
  dot: {
    background: 'white',
    border: '1px solid rgb(0 0 0 / 40%)',
    width: 7,
    height: 7,
    margin: 3,
    borderRadius: '50%',
  },
  dotActyve: {
    width: 7,
    height: 7,
    margin: 3,
    borderRadius: '50%',
    background: 'rgb(0 0 0 / 40%)',
  },
}));
