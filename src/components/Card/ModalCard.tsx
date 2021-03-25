import React from 'react';
import Image from 'next/image';
import { cardInterface } from '../component-types';
import { Grid } from '@material-ui/core';

export const ModalCard: React.FC<cardInterface> = ({
  images,
  title,
  subtitle,
  description,
  category,
  style,
  detail,
}) => {
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
