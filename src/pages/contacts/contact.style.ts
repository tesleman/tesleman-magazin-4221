import { makeStyles, Theme } from '@material-ui/core';

export type useStylesType = ReturnType<typeof useStyles>;
export const useStyles = makeStyles((theme: Theme) => ({
  margin: {
    margin: 5,
  },
  icon: {
    margin: 5,
    fontSize: 35,
  },
  containerClass: {
    margin: 8,
    borderRight: '1px dotted black',
  },
  containerClassLast: {
    margin: 8,
  },
  wrapper: {
    marginBottom: 16,
  },
}));
