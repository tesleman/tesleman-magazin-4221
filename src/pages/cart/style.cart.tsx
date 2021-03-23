import { makeStyles, Theme } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  roots: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  inpunFields: {
    width: '100%',
  },
  inpunFieldsForm: {
    textAlign: 'center',
    width: '100%',
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  dataH1Srtyle: {
    textAlign: 'center',
  },
  avatarStyle: {
    margin: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));
