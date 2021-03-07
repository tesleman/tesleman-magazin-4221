import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connect from './core/connect';
import dbConnect from './core/db';
import { Category } from './models/categoryScema';

mongoose.Promise = global.Promise;
dbConnect();
const category = connect();

category.post(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const data = {
        title: req.body.title,
        meta: req.body.meta,
        slug: req.body.slug,
      };
      const categoryCreate = await Category.create(data);
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

category.get(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      /// api/category?page=0&limit=2
      const numberOfCats = await Category.countDocuments();
      const pageOptions = {
        page: parseInt(req.query.page as string, 10) || 0,
        limit: parseInt(req.query.limit as string, 10) || 10,
        category: req.query.category ? { category: req.query.category } : {},
      };

      let categorys = await Category.find(pageOptions.category)
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit);
      res.status(200).json({
        message: 'succes',
        pageLenght: categorys.length,
        totalCount: numberOfCats,
        data: categorys,
      });
    } catch (error) {}
  },
);

export default category;
