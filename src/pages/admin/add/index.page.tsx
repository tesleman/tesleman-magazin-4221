import React from 'react';

import AdminNav from '../adminNav';
import TabPanel from '.';
import { CardScemaInterface } from '../../api/models/cardScema';

export interface responsIntrfaceInput {
  images: Array<string> | FileList;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  categoryslug: string;
  detail: string;
  slug: string;
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
