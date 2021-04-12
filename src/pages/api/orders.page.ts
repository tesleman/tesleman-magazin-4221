import { NextApiRequest, NextApiResponse } from 'next';

import connect from './core/connect';

import Order from './models/ordersScema';

const order = connect();

order.post(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const orderCreate = await Order.create(req.body);

      res.status(200).json({
        message: 'succes',
        data: orderCreate,
      });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  },
);

export default order;
