import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { Button, Grid, IconButton } from '@material-ui/core';
import { useStyles } from './AlignItemsList.style';
import { AlignItemsListInterface } from '../component-types';
import { useDispatch } from 'react-redux';
import { plussItmCount, minusItmCount, removeItem } from '../../redux/slicers/cartSlicer';
import Link from 'next/link';

const AlignItemsList: React.FC<AlignItemsListInterface> = ({
  hendlSetAlignItemsList,
  mYref,
  cart,
  totalCartPrice,
}) => {
  const handleClickOutside = (e: any) => {
    if (!e.path.includes(myRef.current) && !e.path.includes(mYref.current)) {
      hendlSetAlignItemsList();
    }
  };
  const style = useStyles();
  const myRef = React.useRef();
  const dispatch = useDispatch();
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const plusHendl = React.useCallback((id: string) => dispatch(plussItmCount(id)), []);
  const minusHendl = React.useCallback((id: string) => dispatch(minusItmCount(id)), []);
  const removeHendl = React.useCallback((id: string) => dispatch(removeItem(id)), []);
  return (
    <List ref={myRef} className={style.root}>
      {cart.length > 0 ? (
        <div style={{ maxHeight: 750 }}>
          {cart.map((elem) => (
            <ListCartItem
              key={elem._id}
              plusHendl={plusHendl}
              minusHendl={minusHendl}
              removeHendl={removeHendl}
              elem={elem}
            />
          ))}
          <div className={style.totalPrice}>{totalCartPrice} $</div>
          <div className={style.cartLink}>
            <Link href="/cart">
              <Button>
                <a>To Cart</a>
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </List>
  );
};

export default AlignItemsList;

const EmptyCart = () => {
  const classes = useStyles();
  return (
    <ListItem alignItems="flex-start">
      <ListItemText primary="Cart Empty" />
    </ListItem>
  );
};

export const ListCartItem = ({ elem, plusHendl, minusHendl, removeHendl }) => {
  const style = useStyles();

  return (
    <div key={elem._id}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={elem.title} src={elem.images[0]} />
        </ListItemAvatar>

        <ListItemText
          primary={elem.title}
          secondary={
            <React.Fragment>
              <Typography component="span" className={style.inline} color="textPrimary">
                {elem.subtitle}
              </Typography>

              <br />

              <Typography
                component="span"
                variant="body2"
                className={style.inline}
                color="secondary"
              >
                <span style={{ whiteSpace: 'nowrap' }}>{`${elem.totalPrice} $`}</span>
              </Typography>
            </React.Fragment>
          }
        />
        <Grid
          container
          className={style.container}
          direction="row"
          justify="flex-end"
          alignItems="center"
        >
          <IconButton className={style.button} onClick={() => plusHendl(elem._id)}>
            +
          </IconButton>
          <div className={style.counter}>{elem.count}</div>
          <IconButton
            disabled={elem.count <= 0}
            className={style.button}
            onClick={() => minusHendl(elem._id)}
          >
            -
          </IconButton>
        </Grid>
      </ListItem>
      <DeleteIcon onClick={() => removeHendl(elem._id)} className={style.dellete} />
      <Divider className={style.divider} variant="inset" component="li" />
    </div>
  );
};
