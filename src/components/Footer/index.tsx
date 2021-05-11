import { Container, Grid } from '@material-ui/core';
import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useStyles, useStylesType } from './foote.style';

const Footer: React.FC = () => {
  const style: useStylesType = useStyles();
  const date = new Date();
  return (
    <Container>
      <Grid container direction="row" justify="center">
        <Grid className={style.root} item md={4} xs={12}>
          <h2 className={style.itemTytle}>MEBLA FURNITURE</h2>
          <p>
            We are a global housewares product design company. We bring thought and creativity to
            everyday items through original design.
          </p>
          <address>
            <HomeIcon /> 1001 Milacian Crest Street, Paris France
          </address>
          <span>
            <PhoneIcon /> <a href="tel: +(084) 888 - 6789"> +(084) 888 - 6789</a>
          </span>
          <br />
          <span>
            <MailIcon /> <a href="mailto: Contact@Mebla.com"> Contact@Mebla.com</a>
          </span>
        </Grid>
        <Grid item md={4} xs={12}>
          <h2 className={style.itemTytle}>OPENING TIME</h2>
          <ul className={style.workTime}>
            <li>Mon – Fri: 8AM – 10PM</li>
            <li>Sat: 9AM-8PM</li>
            <li>Sun: Closed</li>
            <li>We Work All The Holidays</li>
          </ul>
        </Grid>
        <Grid item md={4} xs={12}>
          <h2 className={style.itemTytle}>ABOUT</h2>
          <ul className={style.aboute}>
            <li className={style.abouteLi}>
              <a href="contacts">Contacts</a>
            </li>

            <li className={style.abouteLi}>
              <a href="blog">Blog</a>
            </li>
            <li className={style.abouteLi}>
              <a href="cart">Cart</a>
            </li>
            <li className={style.abouteLi}>
              <a href="shop">Our Store</a>
            </li>
          </ul>
        </Grid>
      </Grid>
      <Container>
        <p className={style.botWrap}>
          @{date.getFullYear()} Designed with {<FavoriteIcon className={style.heart} />} by NooTheme
        </p>
      </Container>
    </Container>
  );
};
export default Footer;
