import connect from './core/connect';
import { NextApiRequest, NextApiResponse } from 'next';
import { Card } from './models/cardscema';
import dbConnect from './core/db';
dbConnect();
const apiRoute = connect();
apiRoute.post((req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body, 'req.body');
  try {
    const card = Card.create(req.body);
    res.status(200).json({
      message: 'succes',
      data: card,
    });
  } catch (e) {
    res.status(400).json({
      message: e,
    });
  }
});

export default apiRoute;
export const config = {
  api: {
    bodyParser: true, // Disallow body parsing, consume as stream
  },
};
