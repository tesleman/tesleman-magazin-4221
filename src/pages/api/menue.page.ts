import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connect from './core/connect';
import dbConnect from './core/db';
import Menue from './models/menueScema';
import Category from './models/categoryScema';
import category from './category.page';
import { Subcat } from './models/subcatScema';

mongoose.Promise = global.Promise;
dbConnect();
const menues = connect();

menues.post(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const data = {
        title: req.body.title,
        meta: req.body.meta ? req.body.meta : '',
        slug: `/${req.body.slug}`,
        active: req.body.active,
        subcat: req.body.id ? req.body.id : null,
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
      const categoryFindShop = await Menue.aggregate([
        {
          $match: {
            title: 'Shop',
          },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'subcat',
            foreignField: '_id',
            as: 'subcat',
          },
        },
      ]);

      const categoryFindNoShop = await Menue.aggregate([
        {
          $match: {
            title: {
              $ne: 'Shop',
            },
          },
        },
        {
          $lookup: {
            from: 'subcats',
            localField: 'subcat',
            foreignField: '_id',
            as: 'subcat',
          },
        },
      ]);

      res.status(200).json({
        message: 'succes',
        data: [...categoryFindShop, ...categoryFindNoShop].sort((a, b) => a.sort - b.sort),
      });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  },
);

export default menues;
