import React from 'react';

import AdminNav from '../adminNav';
import TabPanel from '.';

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

const AddCard = (props) => {
  return (
    <AdminNav>
      <TabPanel {...props} />
      {/* <AddEditCard {...props} /> */}
    </AdminNav>
  );
};
export default AddCard;
