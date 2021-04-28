import { NextApiRequest, NextApiResponse } from 'next';
import Menue from '../models/menueScema';

class MenueController {
  async postMenue(req: NextApiRequest, res: NextApiResponse): Promise<void> {
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
  }

  async getMenue(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const categoryFindShop = await Menue.find().populate('Submenue');
      res.status(200).json({
        message: 'succes',
        data: categoryFindShop.sort((a, b) => a.sort - b.sort),
      });
    } catch (error) {
      res.status(400).json({
        message: 'err',
        data: error,
      });
    }
  }
}

export default new MenueController();
