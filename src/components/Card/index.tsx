import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Grid, GridSize, Modal } from '@material-ui/core';
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
  gridxs?: GridSize;
  gridsm?: GridSize;
  gridmd?: GridSize;
}> = ({ card, addTooCartHendl, cart, gridxs = 12, gridsm = 8, gridmd = 3 }) => {
  const style: useStylesType = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [imgIndex, setImgIndex] = React.useState<number>(0);

  const link = card ? `/shop/${card.categoryslug}/${card.slug} ` : '';
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const hendlSetIndex = (i: number) => {
    setImgIndex(i);
  };

  const hendlAddToCardDispatch = () => {
    addTooCartHendl(card);
  };

  if (!card) return <div></div>;
  return (
    <Grid className={style.constainer} item xs={gridxs} sm={gridsm} md={gridmd}>
      <div>
        <Link href={link}>
          <div>
            <h1>{card.title}</h1>
            <h3>{card.description}</h3>
            <div>{card.price}</div>
            <span>{card.category}</span>
            {card.images.length > 0 && (
              <Image
                src={card.images[imgIndex]}
                alt="Picture of the author"
                width={150}
                height={150}
                layout="responsive"
              />
            )}
          </div>
        </Link>
        <div className={style.dots}>
          {card.images.length > 0 &&
            card.images.map((e, i) => (
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
          <AddShoppingCartIcon onClick={hendlAddToCardDispatch} />
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
