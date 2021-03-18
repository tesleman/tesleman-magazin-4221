import { Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    top: 50,
    right: 0,
    width: '100%',
    maxWidth: '500px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 2px 5px rgba(0,0,0, .5)',
    zIndex: -1,
    overflow: 'scroll',
  },
  inline: {
    display: 'inline',
  },
  button: {
    borderRadius: '50%',
    width: 36,
    height: 36,
    maxWidth: 36,
  },
  container: {
    marginTop: '10%',
  },
  counter: {
    padding: 10,
  },
  dellete: {
    cursor: 'pointer',
    float: 'right',

    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  totalPrice: {
    marginTop: 10,
    padding: 5,
  },
}));
