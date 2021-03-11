import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import ShopLayuot from '../shop.layuot';

export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const card = await fetch(`http://${process.env.domein}/api/cardBiId?card=${query.card}`);
  const respons = await card.json();
  return {
    props: { tr: respons }, // will be passed to the page component as props
  };
};

const CartPage = (props) => {
  console;
  const router = useRouter();
  console.log(router.query);
  return <ShopLayuot>{JSON.stringify(props)}</ShopLayuot>;
};

export default CartPage;
