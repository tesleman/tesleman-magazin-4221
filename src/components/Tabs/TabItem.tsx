import React from 'react';
import Image from 'next/image';
import { Grid } from '@material-ui/core';
import { useStyles, useStylesType } from './tabs.style';
import { TabItemInterface } from '../component-types';

export const TabItem: React.FC<TabItemInterface> = ({
  images,
  title,
  subtitle,
  description,
  category,
}) => {
  const style: useStylesType = useStyles();
  return (
    <Grid className={style.constainer} item xs={3}>
      <h1>{title}</h1>
      <h4>{description}</h4>
      <span>{category}</span>
      <Image
        src={images[0]}
        alt="Picture of the author"
        width={150}
        height={150}
        layout="responsive"
      />
      <p>{subtitle}</p>
    </Grid>
  );
};
