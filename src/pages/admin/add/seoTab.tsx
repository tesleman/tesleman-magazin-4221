import { Grid, Paper } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useStyles } from './add.style';
import { CardUpdate } from '../../../utils/fileUploads';

interface formInterface {
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
}

const SeoTab: React.FC<{ _id: string; seo: formInterface }> = ({ _id, seo }) => {
  const { meta_title, meta_keywords, meta_description } = seo;
  const router = useRouter();
  const style = useStyles();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      meta_title: meta_title,
      meta_keywords,
      meta_description,
    },
  });

  const handleSubmitForm = async (data: formInterface) => {
    try {
      const update = await CardUpdate({ _id, data });
      if (update.message === 'succes') router.push(`/admin/update/${update.data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <Grid alignContent="center" alignItems="flex-start" container direction="column">
        <Paper>
          <Grid alignContent="center" alignItems="flex-start" container direction="column">
            <label htmlFor="meta_title">
              <Grid container direction="column">
                meta title
                <input
                  className={style.row_item}
                  ref={register}
                  type="text"
                  name="meta_title"
                  multiple
                />
              </Grid>
            </label>
            <label htmlFor="meta_keywords">
              <Grid container direction="column">
                meta keywords
                <input
                  className={style.row_item}
                  ref={register}
                  type="text"
                  name="meta_keywords"
                  multiple
                />
              </Grid>
            </label>
            <label htmlFor="meta_description">
              <Grid container direction="column">
                meta description
                <input
                  className={style.row_item}
                  ref={register}
                  type="text"
                  name="meta_description"
                  multiple
                />
              </Grid>
            </label>
          </Grid>
        </Paper>
        <button className={style.row_item} style={{ width: 60 }} type="submit">
          submit
        </button>
      </Grid>
    </form>
  );
};

export default SeoTab;
