import { limitQery } from './ueryCheck';
import Carda from '../pages/api/models/cardScema';
import Category, { CategoryBaseDocument } from '../pages/api/models/categoryScema';

export const cardProps = async (query) => {
  const pageOptions = {
    page: ((query.page > 0 && +query.page - 1) as number) || 0,
    limit: limitQery(query.limit) || 3,
    category: query.slug ? { categoryslug: query.slug } : {},
    sort: sortyng(query),
    text: query.q ? { $text: { $search: query.q } } : {},
  };

  const category = await Category.findOne({ slug: query.slug });
  const categoryId = (category: CategoryBaseDocument, query) => {
    if (query.slug) {
      return { categoryId: category._id };
    }
    return;
  };
  const totalCount = await Carda.find({
    ...pageOptions.category,
    ...pageOptions.text,
  }).countDocuments();
  let card = await Carda.find({ ...categoryId(category, query), ...pageOptions.text })
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort(pageOptions.sort);

  const prop = { card, totalCount, category };

  return JSON.stringify(prop);
};

const sortyng = (query) => {
  if (query.price) return { price: query.price };
  if (query.data) return { createdAt: query.data };
};
