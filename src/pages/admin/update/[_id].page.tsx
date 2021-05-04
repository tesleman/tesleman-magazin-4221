import { GetServerSideProps } from 'next';
import React from 'react';
import Card from '../../api/models/cardScema';
import AddEditCard from '../add/AddEditCard';

import AdminNav from '../adminNav';
export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const categories = await Card.findOne({ _id: query._id as string });

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};
const Update = ({ categories }) => {
  return (
    <AdminNav>
      <AddEditCard {...categories} />
    </AdminNav>
  );
};

export default Update;
