import { GetServerSideProps } from 'next';
import React from 'react';
import Categoryes from '.';
import { limitQery } from '../../../utils/ueryCheck';
import Category from '../../api/models/categoryScema';
import AdminNav from '../adminNav';

export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const pageOptions = {
    page: limitQery(query.page) | 0,
    limit: limitQery(query.count) | 5,
  };
  const categories = await Category.find({})
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit);

  const count = await Category.find().countDocuments();
  return {
    props: { categories: JSON.parse(JSON.stringify(categories)), count },
  };
};

const Categorys = ({ categories, count }) => {
  console.log(categories);
  return (
    <AdminNav>
      <Categoryes count={count} categories={categories} slug="category" />
    </AdminNav>
  );
};

export default Categorys;
