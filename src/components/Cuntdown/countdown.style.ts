import { makeStyles, Theme } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    color: 'white',
    textAlign: 'center',
  },
  rootBg: {
    backgroundImage: 'url(/bg_countdow2.jpg)',
    position: 'absolute',
    width: '100%',
    top: 0,
    left: 0,
  },
  countdownItem: {
    color: '#111',
    fontSize: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    lineHeight: '30px',
    margin: '10px',
    paddingTop: '10px',
    position: 'relative',
    width: '100px',
    height: '100px',
    '& span': {
      color: '#333',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
    },
  },

  countdownWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },

  countdownSvg: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100px',
    height: '100px',
  },
}));
