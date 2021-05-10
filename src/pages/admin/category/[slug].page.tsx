import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import Category from '../../api/models/categoryScema';
import AdminNav from '../adminNav';
import CategoryForm from './add';
export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const categorie = await Category.findOne({ slug: query.slug as string });

  return { props: { categorie: JSON.parse(JSON.stringify(categorie)) } };
};
const CategorySlug = ({ categorie }) => {
  const router = useRouter();
  console.log(categorie);
  return (
    <AdminNav>
      <CategoryForm {...categorie} />
    </AdminNav>
  );
};

export default CategorySlug;
