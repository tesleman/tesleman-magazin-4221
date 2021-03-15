import dbConnect from '../api/core/db';
import { Card as Carda } from '../api/models/cardScema';

export const cardProps = async (query) => {
  dbConnect();

  const pageOptions = {
    page: ((+query.page - 1) as number) || 0,
    limit: parseInt(query.limit as string, 10) || 3,
    category: query.slug ? { categories_slug: query.slug } : {},
  };
  const numberOfCards = await Carda.find(pageOptions.category).countDocuments();
  let card = await Carda.find(pageOptions.category)
    .skip(pageOptions.page * pageOptions.limit)
    .limit(pageOptions.limit);

  const prop = { card: card, totalCount: numberOfCards };
  return JSON.stringify(prop);
};
