import { NextApiRequest, NextApiResponse } from 'next';

import Menue from './models/menueScema';
import Category from './models/categoryScema';
import connect from './core/connect';

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
