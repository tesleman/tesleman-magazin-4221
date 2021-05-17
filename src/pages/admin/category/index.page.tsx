import { GetServerSideProps } from 'next';
import React from 'react';
import Categoryes from '.';
import { limitQery } from '../../../utils/ueryCheck';
import { CardScemaInterface } from '../../api/models/cardScema';
import Category from '../../api/models/categoryScema';
import AdminNav from '../adminNav';

export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const pageOptions = {
    page: limitQery(query.page as string) | 0,
    limit: limitQery(query.count as string) | 5,
  };
  const categories = await Category.find({})
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit);

  const count = await Category.find().countDocuments();
  return {
    props: { categories: JSON.parse(JSON.stringify(categories)), count },
  };
};

const Categorys: React.FC<{ categories: Array<CardScemaInterface>; count: number }> = ({
  categories,
  count,
}) => {
  return (
    <AdminNav>
      <Categoryes
        count={count}
        categories={categories}
        slug="category"
        add_slug="category/add_category"
      />
    </AdminNav>
  );
};

export default Categorys;
