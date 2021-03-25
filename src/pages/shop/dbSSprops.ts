import dbConnect from '../api/core/db';
import Carda from '../api/models/cardScema';

export const cardProps = async (query) => {
  dbConnect();

  const pageOptions = {
    page: ((query.page > 0 && +query.page - 1) as number) || 0,
    limit: parseInt(query.limit as string, 10) || 3,
    category: query.slug ? { categoryslug: query.slug } : {},
    sort: sortyng(query),
    text: query.q ? { $text: { $search: query.q } } : {},
  };

  const numberOfCards = await Carda.find({
    ...pageOptions.category,
    ...pageOptions.text,
  }).countDocuments();
  let card = await Carda.find({ ...pageOptions.category, ...pageOptions.text })
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit)
    .sort(pageOptions.sort);

  const prop = { card: card, totalCount: numberOfCards };

  return JSON.stringify(prop);
};

const sortyng = (query) => {
  if (query.pricesort) return { price: query.pricesort };
  if (query.data) return { createdAt: query.data };
};
