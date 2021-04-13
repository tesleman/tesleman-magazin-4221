import { makeStyles, Theme } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 150,
  },
}));
