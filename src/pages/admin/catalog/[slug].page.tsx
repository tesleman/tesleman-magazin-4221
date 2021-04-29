import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import Card from '../../api/models/cardScema';
import AdminNav from '../adminNav';

export const getServerSideProps: GetServerSideProps = async ({ query, res, req }) => {
  const cardBiCategory = await Card.find({ categoryslug: query.slug as string });

  return {
    props: {
      cards: JSON.parse(JSON.stringify(cardBiCategory)),
    },
  };
};

function CatalogSlug({ cards }) {
  return (
    <AdminNav>
      <ul>
        {cards.map((item) => (
          <Link key={item._id} href={`/admin/update/${item._id}`}>
            <a>
              <li>{item.title}</li>
            </a>
          </Link>
        ))}
      </ul>
    </AdminNav>
  );
}

export default CatalogSlug;
