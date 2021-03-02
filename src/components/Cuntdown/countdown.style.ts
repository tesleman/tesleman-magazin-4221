import { makeStyles, Theme } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    color: 'white',
    textAlign: 'center',
  },
  headerWraper: {
    padding: 45,
  },
  rootBg: {
    backgroundImage: 'url(/bg_countdow2.jpg)',
    width: '100%',
    height: '450px',
    marginBottom: 350,
  },

  countdownItem: {
    color: '#333',
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
  rootContduwnContiner: {
    background: 'white',
    color: 'black',
    padding: 15,
    boxShadow: '0px 6px 20px rgb(0 0 0 / 65%)',
    position: 'relative',
  },
}));
