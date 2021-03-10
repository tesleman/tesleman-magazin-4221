import { NextPageContext, GetServerSideProps } from 'next';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { context: context.query.slug }, // will be passed to the page component as props
  };
};
const SingleCard = (props) => {
  console.log(props);
  return <div style={{ marginTop: 70 }}>{}</div>;
};

export default SingleCard;
