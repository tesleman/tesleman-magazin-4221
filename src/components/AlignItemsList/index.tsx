import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './AlignItemsList.style';
import { AlignItemsListInterface } from '../component-types';
import { useDispatch } from 'react-redux';
import { plussItmCount } from '../../redux/slicers/cartSlicer';

const AlignItemsList: React.FC<AlignItemsListInterface> = ({
  hendlSetAlignItemsList,
  mYref,
  cart,
}) => {
  const handleClickOutside = (e: any) => {
    if (!e.path.includes(myRef.current) && !e.path.includes(mYref.current)) {
      hendlSetAlignItemsList();
    }
  };
  const classes = useStyles();
  const myRef = React.useRef();
  const dispatch = useDispatch();
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  console.log(cart, ' cart');
  const plusHendl = (id: string) => dispatch(plussItmCount(id));
  return (
    <List ref={myRef} className={classes.root}>
      {cart.length > 0 ? (
        cart.map((elem) => (
          <div key={elem._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={elem.title} src={elem.images[0]} />
              </ListItemAvatar>
              <div style={{ cursor: 'pointer' }} onClick={() => plusHendl(elem._id)}>
                +
              </div>
              <ListItemText
                primary={elem.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary">
                      {elem.subtitle}
                    </Typography>
                    <br />
                    {elem.description}
                    {elem.totalPrice}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))
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
