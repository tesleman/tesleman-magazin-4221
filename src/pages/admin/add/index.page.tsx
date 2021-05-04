import { Button, FormControl, FormHelperText, Grid, NativeSelect } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import slugify from 'slugify';
import Image from 'next/image';
import { apiFetch } from '../../../redux/redux-api/redux-api';
import { uploatData, cardCreate, CardUpdate } from '../../../utils/fileUploads';
import AdminNav from '../adminNav';
import AddEditCard from './AddEditCard';
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
