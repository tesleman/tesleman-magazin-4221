import { GetServerSideProps } from 'next';
import React from 'react';
import Card, { CardScemaInterface } from '../../api/models/cardScema';
import TabPanel from '../add';

import AdminNav from '../adminNav';

export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const card = await Card.findOne({ _id: query._id as string });

  return {
    props: {
      singleCard: JSON.parse(JSON.stringify(card)),
    },
  };
};
const Update: React.FC<{ singleCard: CardScemaInterface }> = ({ singleCard }) => {
  return (
    <AdminNav>
      <TabPanel {...singleCard} />
    </AdminNav>
  );
};

export default Update;
