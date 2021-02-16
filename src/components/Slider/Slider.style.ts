import { makeStyles, Theme } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme: Theme) => ({
  slideImgContainer: {
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImgTextanim: {
    color: 'white',
    transform: 'translateY(15rem)',
    opacity: 0,
  },
  slideImgText: {
    color: 'white',
    animation: '$fadeIn 2s ease-in-out',
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(15rem)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
  dots: {
    bottom: 0,
    '& li': {
      background: 'white',
      borderRadius: '50%',
    },
  },
}));
