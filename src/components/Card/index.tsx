import React from 'react';
import Image from 'next/image';
import { Grid, Modal } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { TabItemInterface } from '../component-types';
import { useStylesType, useStyles } from './card.style';
import { ModalCard } from './ModalCard';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, addTooCart } from '../import-export';

export const Card: React.FC<TabItemInterface> = (props) => {
  const { images, title, subtitle, description, category } = props;
  const style: useStylesType = useStyles();
  const [open, setOpen] = React.useState(false);
  const [imgIndex, setImgIndex] = React.useState(0);
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  console.log('asdsa', cart);
  const addTooCartHendl = () => {
    dispatch(addTooCart(props));
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const hendlSetIndex = (i) => {
    setImgIndex(i);
  };

  return (
    <Grid className={style.constainer} item xs={3}>
      <div>
        <h1>{title}</h1>
        <h4>{description}</h4>
        <span>{category}</span>
        <Image
          src={images[imgIndex]}
          alt="Picture of the author"
          width={150}
          height={150}
          layout="responsive"
        />
        <div className={style.dots}>
          {images.map((e, i) => (
            <div
              className={i === imgIndex ? style.dotActyve : style.dot}
              key={i}
              onClick={() => hendlSetIndex(i)}></div>
          ))}
        </div>
        <p>{subtitle}</p>
      </div>
      <div className={style.sideItem}>
        <AddShoppingCartIcon onClick={addTooCartHendl} />
        <FavoriteBorderIcon />
        <ZoomInIcon onClick={handleOpen} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description">
        {
          <div className={style.modal}>
            <ModalCard {...props} style={style} />
          </div>
        }
      </Modal>
    </Grid>
  );
};
