import React from 'react';
import { useForm } from 'react-hook-form';
import { CardUpdate } from '../../../utils/fileUploads';

interface formInterface {
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
}

const SeoTab = ({ _id, seo }) => {
  const { meta_title, meta_keywords, meta_description } = seo;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      meta_title,
      meta_keywords,
      meta_description,
    },
  });

  const handleSubmitForm = async (data: formInterface) => {
    const update = await CardUpdate({ _id, ...data });
  };

  return (
    <>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <label htmlFor="meta_title">
          <input ref={register} type="text" name="meta_title" multiple />
          meta title
        </label>
        <label htmlFor="meta_keywords">
          <input ref={register} type="text" name="meta_keywords" multiple />
          meta_keywords
        </label>
        <label htmlFor="meta_description">
          <input ref={register} type="text" name="meta_description" multiple />
          meta_description
        </label>
        <button style={{ width: 60 }} type="submit">
          submit
        </button>
      </form>
    </>
  );
};

export default SeoTab;
