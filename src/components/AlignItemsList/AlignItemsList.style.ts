import { Theme, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    top: 50,
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    boxShadow: '0 2px 5px rgba(0,0,0, .5)',
    zIndex: -1,
  },
  inline: {
    display: 'inline',
  },
}));
