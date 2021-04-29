import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Category from '../../api/models/categoryScema';
import AdminNav from '../adminNav';

export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const categories = await Category.find().exec();

  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};
const Catalog = ({ categories }) => {
  return (
    <AdminNav>
      <ul>
        {categories.map((item, index) => (
          <li key={index}>
            <Link href={`/admin/catalog/${item.slug}`}>
              <a>{item.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </AdminNav>
  );
};

export default Catalog;
