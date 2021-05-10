import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { limitQery } from '../../../utils/ueryCheck';
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
const Catalog = ({ categories, count }) => {
  return (
    <AdminNav>
      <Categoryes count={count} categories={categories} slug="catalog" />
    </AdminNav>
  );
};

export default Catalog;
