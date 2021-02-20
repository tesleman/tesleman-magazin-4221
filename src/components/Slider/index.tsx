import React from 'react';
import Slider, { LazyLoadTypes } from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Slide } from './Slide';
import { useStyles, useStylesType } from './Slider.style';
const img = [
  {
    img: '/uploads/slider/photo-1519681393784-d120267933ba.jfif',
  },
  {
    img: '/uploads/slider/photo-1480497490787-505ec076689f.jfif',
  },
  {
    img: '/uploads/slider/photo-1612979857678-0ce10e5b3439.jfif',
  },
];

const Slidere = () => {
  const style: useStylesType = useStyles();
  const [afterChange, setAfterChange] = React.useState(0);
  const [beforeChange, setBeforeChange] = React.useState(0);
  const progressive: LazyLoadTypes = 'progressive';
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: `slick-dots ${style.dots}`,
    lazyLoad: progressive,
    afterChange: (current) => {
      setBeforeChange(current);
    },

    beforeChange: (current, next) => setAfterChange(next),
  };
  return (
    <Slider {...settings}>
      {img.map((e, i) => (
        <Slide afterChange={afterChange} beforeChange={beforeChange} key={i} src={e.img} />
      ))}
    </Slider>
  );
};
export default Slidere;
