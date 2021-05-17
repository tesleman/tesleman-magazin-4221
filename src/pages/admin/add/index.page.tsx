import React from 'react';

import AdminNav from '../adminNav';
import TabPanel from '.';
import { CardScemaInterface } from '../../api/models/cardScema';

export interface responsIntrfaceInput {
  active: boolean;
  slug: string;
  title: string;
  category: string;
  categoryslug: string;
  price: number;
  detail: string;
  artikul: string;
  description: string;
  subtitle: string;
  images: Array<string>;
  _id: string;
}

const AddCard: React.FC<CardScemaInterface> = (props) => {
  return (
    <AdminNav>
      <TabPanel {...props} />
      {/* <AddEditCard {...props} /> */}
    </AdminNav>
  );
};
export default AddCard;
