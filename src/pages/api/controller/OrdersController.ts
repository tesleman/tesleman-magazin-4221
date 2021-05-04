import { NextApiRequest, NextApiResponse } from 'next';
import Order from '../models/ordersScema';

class OrdersController {
  async PostOrder(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const order = {
        status: 'New',
        ...req.body,
      };

      const orderCreate = await Order.create(order);

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

  async UpdateOrder(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const id = req.body._id;
      const status = req.body.status;

      const updateOrder = await Order.findByIdAndUpdate({ _id: id }, { status }).exec();
      const updatedOrder = await Order.findById({ _id: updateOrder._id }).exec();

      res.status(200).json({
        message: 'succes',
        updatedOrder,
      });
    } catch (error) {
      res.status(401).json({
        message: 'faild',
        error,
      });
    }
  }
}

export default new OrdersController();
