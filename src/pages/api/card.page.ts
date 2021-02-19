import connect from './core/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { Card, CardScemaInterface } from './models/cardscema';
import dbConnect from './core/db';
import { send } from 'process';

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
      const card = await Card.find({ category: req.query.categori });
      res.send(card);
      console.log(card);
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
