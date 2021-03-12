import connect from './core/connect';

import { NextApiRequest, NextApiResponse } from 'next';
import { Card } from './models/cardScema';
import dbConnect from './core/db';

dbConnect();
const apiRoute = connect();

apiRoute.get(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      /// api/card?page=0&limit=2
      console.log(req.query.card);
      if (req.query.card) {
        const card = await Card.find({ slug: req.query.card });

        res.status(200).json({
          message: 'succes',
          data: card[0],
        });
      }
    } catch (e) {
      res.status(400).json({
        message: e,
      });
    }
  },
);

export default apiRoute;
