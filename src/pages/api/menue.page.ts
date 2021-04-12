import { NextApiRequest, NextApiResponse } from 'next';
import connect from './core/connect';
import Menue from './models/menueScema';

const menues = connect();

menues.post(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    try {
      const data = {
        title: req.body.title,
        meta: req.body.meta || '',
        slug: `/${req.body.slug}`,
        active: req.body.active,
        subcat: req.body.id || null,
        sort: req.body.sort || 500,
      };
      const categoryCreate = await Menue.create(data);
      res.status(200).json({
        message: 'succes',
        data: categoryCreate,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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
        message: 'err',
        data: error,
      });
    }
  },
);

export default menues;
