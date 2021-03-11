import connect from './core/connect';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';
import { Card, CardScemaInterface } from './models/cardScema';
import dbConnect from './core/db';

dbConnect();
const apiRoute = connect();
apiRoute.post(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const cardSpred = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        category: req.body.category,
        images: req.body.images,
        slug: req.body.slug,
        detail: req.body.detail,
      };
      const card = await Card.create(cardSpred);
      res.status(200).json({
        message: 'succes',
        data: card,
      });
    } catch (e) {
      res.status(400).json({
        message: e,
      });
    }
  },
);

apiRoute.get(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      /// api/card?page=0&limit=2

      const pageOptions = {
        page: parseInt(req.query.page as string, 10) || 0,
        limit: parseInt(req.query.limit as string, 10) || 10,
        category: req.query.category ? { category: req.query.category } : {},
      };
      const numberOfCards = await Card.find(pageOptions.category).count();
      let card = await Card.find(pageOptions.category)
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit);

      res.status(200).json({
        message: 'succes',
        pageLenght: card.length,
        totalCount: numberOfCards,
        data: card,
      });
    } catch (e) {
      res.status(400).json({
        message: e,
      });
    }
  },
);

export default apiRoute;
export const config = {
  api: {
    bodyParser: true, // Disallow body parsing, consume as stream
  },
};
