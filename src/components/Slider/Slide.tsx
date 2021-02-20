import React from 'react';

import { useStyles, useStylesType } from './Slider.style';

export const Slide = ({ src, afterChange, beforeChange }) => {
  const style: useStylesType = useStyles();

  return (
    <div style={{ backgroundImage: `url(${src})` }} className={style.slideImgContainer}>
      <div className={afterChange === beforeChange ? style.slideImgText : style.slideImgTextanim}>
        <h1>Lorem, ipsum dolor.</h1>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
      </div>
    </div>
  );
};
