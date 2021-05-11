import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Grid, GridSize, Modal } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ZoomInIcon from '@material-ui/icons/ZoomIn';

import { useStylesType, useStyles } from './card.style';
import { ModalCard } from './ModalCard';
import { CardScemaInterface } from '../../pages/api/models/cardScema';

export const Card: React.FC<{
  card: CardScemaInterface;
  cart: Array<CardScemaInterface>;
  addTooCartHendl: (payload: CardScemaInterface) => void;
  gridxs?: GridSize;
  gridsm?: GridSize;
  gridmd?: GridSize;
  gridxl?: GridSize;
}> = ({ card, addTooCartHendl, cart, gridxs = 12, gridsm = 8, gridmd = 3, gridxl = 3 }) => {
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
    <Grid className={style.constainer} item xl={gridxl} xs={gridxs} sm={gridsm} md={gridmd}>
      <div>
        <Link href={link}>
          <a>
            <h1 className={style.title}> {card.title}</h1>
            <h3 className={style.subtitle}> {card.description}</h3>

            <Image
              src={card.images.length > 0 ? card.images[imgIndex] : '/img_no_found.jpg'}
              alt="Picture of the author"
              width={150}
              height={150}
              layout="responsive"
            />
          </a>
        </Link>
        <div className={style.dots}>
          {card.images.length > 0 &&
            card.images.map((e, i) => (
              <div
                className={i === imgIndex ? style.dotActyve : style.dot}
                key={i}
                onClick={() => hendlSetIndex(i)}
              ></div>
            ))}
        </div>
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
        aria-describedby="simple-modal-description"
      >
        {
          <div className={style.modal}>
            <ModalCard {...card} />
          </div>
        }
      </Modal>
      <span className={style.price}>
        <span>$ </span>
        {card.price}
      </span>
    </Grid>
  );
};
