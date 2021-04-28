import { NextApiRequest, NextApiResponse } from 'next';
import Order from '../models/ordersScema';

class OrdersController {
  async PostOrder(req: NextApiRequest, res: NextApiResponse): Promise<void> {
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
  }
}

export default new OrdersController();
