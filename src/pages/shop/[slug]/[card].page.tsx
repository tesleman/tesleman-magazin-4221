import { Button, Container, Grid, TextField } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import Image from 'next/image';

import { PropsSingleCard } from '../shop-types';
import { useStyles, useStylesType } from '../styles/shop.style';
import { useDispatch, useSelector } from 'react-redux';
import { addTooCart, cardInterface, Layuot, RootState } from '../shop.import-export';
import Card, { CardScemaInterface } from '../../api/models/cardScema';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const card = await Card.findOne({ slug: query.card as string });
  // const card = await fetch(`http://${process.env.domein}/api/cardBiId?card=${query.card}`);

  return {
    props: { data: JSON.parse(JSON.stringify(card)) }, // will be passed to the page component as props
  };
};

const CartPage: React.FC<PropsSingleCard> = ({ message, data }) => {
  const style: useStylesType = useStyles();
  const dispatch = useDispatch();
  const [index, setIndex] = React.useState(0);
  const { cart } = useSelector((state: RootState) => state.cart);
  const [cartItemCount, setcartItemCount] = React.useState(1);
  const setIndexForImgNavSliderHendl = (i: number) => {
    setIndex(i);
  };

  let cartIncludesItem = cart.some((item: CardScemaInterface) => item._id === data._id);

  const handleCartPlus = () => {
    setcartItemCount(cartItemCount + 1);
  };
  const handleCartminus = () => {
    setcartItemCount(cartItemCount - 1);
  };

  const onHandleCardItemArrowChang = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = +event.target.value;
    if (eventValue < 0) return;
    setcartItemCount(eventValue);
  };

  const hensdlAddCartDispatchItem = () => {
    if (cartIncludesItem) return;
    const payloadData = { ...data, count: cartItemCount };
    dispatch(addTooCart(payloadData));
  };
  return (
    <Layuot
      baseCategory={{ category: 'Shop', link: '/shop' }}
      src={'/shop-1.jpg'}
      breadcrumbsCard={data.title}
    >
      <Container>
        <Head>
          <title>{data.seo.meta_title}</title>.
          <meta name="description" content={data.seo.meta_description} />
          <meta name="keywords" content={data.seo.meta_keywords} />
        </Head>
        <Grid container direction="row">
          <Grid item md={6} xs={12}>
            <Image
              layout="responsive"
              alt={data.title}
              width={350}
              height={350}
              src={data.images.length > 0 ? data.images[index] : '/img_no_found.jpg'}
            />

            <Grid container direction="row" alignItems="flex-start">
              {data.images.map((elem: string, index: number) => (
                <Grid item xs={4} key={index} className={style.imagePagination}>
                  {data.images.length > 0 && (
                    <Image
                      width={75}
                      height={75}
                      src={elem}
                      onClick={() => setIndexForImgNavSliderHendl(index)}
                      alt=""
                    />
                  )}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item md={6} xs={12}>
            <div className={style.cardDetails}>
              <h2>Title: {data.title}</h2>
              <p>Artikul: {data.artikul}</p>
              <div className={style.price}>
                Price: <h1> {data.price} $</h1>
              </div>
              <h3>{data.category}</h3>
              <h4>{data.description}</h4>
              <br />
              <Grid container direction="row" justify="center">
                <Button disabled={cartItemCount <= 0} onClick={handleCartminus}>
                  -
                </Button>
                <TextField
                  onChange={onHandleCardItemArrowChang}
                  className={style.input}
                  id="standard-number"
                  type="number"
                  color="secondary"
                  value={cartItemCount}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Button onClick={handleCartPlus}>+</Button>

                <Button
                  disabled={cartIncludesItem}
                  onClick={hensdlAddCartDispatchItem}
                  variant="contained"
                  color="secondary"
                >
                  Add To Cart
                </Button>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Container>
          <Grid container direction="row">
            <Grid item md={6} xs={12}>
              <h3 style={{ float: 'right' }}>Deatail Info:</h3>
            </Grid>
            <Grid item md={6} xs={12}>
              <p style={{ textAlign: 'left', paddingLeft: 23 }}>{data.detail}</p>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </Layuot>
  );
};

export default CartPage;
