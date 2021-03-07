import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connect from './core/connect';
import dbConnect from './core/db';
import { Menue } from './models/menueScema';

mongoose.Promise = global.Promise;
dbConnect();
const menues = connect();

menues.post(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const data = {
        title: req.body.title,
        meta: req.body.meta,
        slug: req.body.slug,
        active: req.body.active,
        subcat: req.body.id,
      };
      const categoryCreate = await Menue.create(data);

      res.status(200).json({
        message: 'succes',
        data: categoryCreate,
      });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  },
);

menues.get(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const categoryCreate = await Menue.find({}).populate('subcat').exec();

      res.status(200).json({
        message: 'succes',
        data: categoryCreate,
      });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  },
);

export default menues;
