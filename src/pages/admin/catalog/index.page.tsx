import { GetServerSideProps } from 'next';
import React from 'react';
import { limitQery } from '../../../utils/ueryCheck';
import { CardScemaInterface } from '../../api/models/cardScema';
import Category from '../../api/models/categoryScema';
import AdminNav from '../adminNav';
import Categoryes from '../category';

export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const pageOptions = {
    page: limitQery(query.page) | 0,
    limit: limitQery(query.count) | 5,
  };
  const categories = await Category.find({})
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit);
  const orderscountDocuments = await Category.find().countDocuments();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      count: orderscountDocuments,
    },
  };
};
const Catalog: React.FC<{ categories: Array<CardScemaInterface>; count: number }> = ({
  categories,
  count,
}) => {
  return (
    <AdminNav>
      <Categoryes count={count} categories={categories} slug="catalog" add_slug="add" />
    </AdminNav>
  );
};

export default Catalog;
