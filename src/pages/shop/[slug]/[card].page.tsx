import { Container, Grid } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';
import ShopLayuot from '../shop.layuot';
import { PropsSingleCard } from '../shop-types';
import { useStyles, useStylesType } from '../styles/shop.style';

export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const card = await fetch(`http://${process.env.domein}/api/cardBiId?card=${query.card}`);
  const respons = await card.json();
  return {
    props: respons, // will be passed to the page component as props
  };
};

const CartPage: React.FC<PropsSingleCard> = (props) => {
  const style: useStylesType = useStyles();
  const [index, setIndex] = React.useState(0);
  const setIndexHendl = (i) => {
    setIndex(i);
  };
  return (
    <ShopLayuot br={props.data.title}>
      <Container>
        <Grid container direction="row">
          <Grid item xs={6}>
            <Image
              layout="responsive"
              alt={props.data.title}
              width={350}
              height={350}
              src={props.data.images[index]}
            />
            <Grid container direction="row" justify="center">
              {props.data.images.map((elem, index) => (
                <Grid item xs={4} key={index} className={style.imagePagination}>
                  <Image
                    width={75}
                    height={75}
                    src={elem}
                    onClick={() => setIndexHendl(index)}
                    alt=""
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <div className={style.cardDetails}>
              <h2>{props.data.title}</h2>
              <h4>{props.data.description}</h4>
              <p>{props.data.detail}</p>
            </div>
          </Grid>
        </Grid>
      </Container>
    </ShopLayuot>
  );
};

export default CartPage;
