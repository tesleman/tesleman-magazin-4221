import { makeStyles, Theme } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: 45,
    fontFamily: 'Dosis',
  },
  AdvantagesItem: {
    textAlign: 'center',
    padding: 24,

    '& svg': {
      color: theme.palette.secondary.main,
      fontSize: 44,
    },
  },
}));
