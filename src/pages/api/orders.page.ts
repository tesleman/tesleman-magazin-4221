import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connect from './core/connect';
import dbConnect from './core/db';

import Order from './models/ ordersScema';

mongoose.Promise = global.Promise;
dbConnect();
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
