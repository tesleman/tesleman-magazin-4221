import React from 'react';
import Image from 'next/image';

import { Grid } from '@material-ui/core';
import { CardScemaInterface } from '../../pages/api/models/cardScema';
import { useStyles } from './card.style';

export const ModalCard: React.FC<CardScemaInterface> = ({
  images,
  title,
  subtitle,
  description,
  category,

  detail,
}) => {
  const style = useStyles();
  return (
    <Grid container direction="row">
      <Grid xs={4}>
        {images.length > 0 && (
          <Image
            src={images[0]}
            alt="Picture of the author"
            width={150}
            height={150}
            layout="responsive"
          />
        )}
      </Grid>

      <Grid className={style.modaContent} xs={6}>
        <h1>{title}</h1>
        <h4>{description}</h4>
        <span>{category}</span>

        <b>{subtitle}</b>
        <p>{detail}</p>
      </Grid>
    </Grid>
  );
};
