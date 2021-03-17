import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connect from './core/connect';
import dbConnect from './core/db';
import Menue from './models/menueScema';
import Category from './models/categoryScema';

mongoose.Promise = global.Promise;
dbConnect();
const menuesEdit = connect();

menuesEdit.post(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const ass = await Category.aggregate([
        {
          $project: {
            _id: 1,
          },
        },
      ]);

      const data = {
        title: req.body.title,
        slug: `/${req.body.slug}`,
        active: req.body.active,
        subcat: ass,
      };
      console.log(data);
      const categoryFind = await Menue.findByIdAndUpdate(req.query, data).exec();

      res.status(200).json({
        message: 'succes',
        data: categoryFind,
      });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  },
);

export default menuesEdit;
