import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Grid, Modal } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import { cardInterface } from '../component-types';
import { useStylesType, useStyles } from './card.style';
import { ModalCard } from './ModalCard';

export const Card: React.FC<{
  card: cardInterface;
  cart: Array<cardInterface>;
  addTooCartHendl: (payload: cardInterface) => void;
}> = ({ card, addTooCartHendl, cart }) => {
  const style: useStylesType = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [imgIndex, setImgIndex] = React.useState<number>(0);
  console.log();
  const link = `/shop/${card.category.split(' ').join('_')}/${card.slug} `;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const hendlSetIndex = (i: number) => {
    setImgIndex(i);
  };

  return (
    <Grid className={style.constainer} item xs={3}>
      <div>
        <Link href={link}>
          <div>
            <h1>{card.title}</h1>
            <h4>{card.description}</h4>
            <span>{card.category}</span>
            <Image
              src={card.images[imgIndex]}
              alt="Picture of the author"
              width={150}
              height={150}
              layout="responsive"
            />
          </div>
        </Link>
        <div className={style.dots}>
          {card.images.map((e, i) => (
            <div
              className={i === imgIndex ? style.dotActyve : style.dot}
              key={i}
              onClick={() => hendlSetIndex(i)}></div>
          ))}
        </div>
        <p>{card.subtitle}</p>
      </div>
      <div className={style.sideItem}>
        {cart.some((elem) => elem._id === card._id) ? (
          ''
        ) : (
          <AddShoppingCartIcon onClick={() => addTooCartHendl(card)} />
        )}
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
            <ModalCard {...card} style={style} />
          </div>
        }
      </Modal>
    </Grid>
  );
};
