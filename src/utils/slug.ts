import slugify from 'slugify';
export const titleCheng = (togleChecbox, getValues, setValue) => {
  // slug creator
  if (!togleChecbox) {
    // if Checbox is off genereate slug frome slug feald
    let box = getValues('slug');
    let slug = slugify(box, {
      replacement: '_',
      remove: /[*+~.()'"!:@]/g,
    });
    setValue('slug', slug);
  }
  if (togleChecbox) {
    // if Checbox is on genereate slug frome title feald
    let box = getValues('title');
    let slug = slugify(box, {
      replacement: '_',
      remove: /[*+~.()'"!:@ь]/g,
      lower: true,
      locale: 'us',
    });
    setValue('slug', slug);
    setValue('title', box);
  }
};
