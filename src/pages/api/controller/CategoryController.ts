import { NextApiRequest, NextApiResponse } from 'next';
import Category from '../models/categoryScema';

class Controller {
  async getCat(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      /// api/category?page=0&limit=2
      const numberOfCats = await Category.countDocuments();
      const pageOptions = {
        page: parseInt(req.query.page as string, 10) || 0,
        limit: parseInt(req.query.limit as string, 10) || 10,
        category: req.query.category ? { category: req.query.category } : {},
      };

      const categorys = await Category.find(pageOptions.category)
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit);

      res.status(200).json({
        message: 'succes',
        pageLenght: categorys.length,
        totalCount: numberOfCats,
        data: categorys,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async postCat(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const data = {
        title: req.body.title,
        meta: req.body.meta ? req.body.meta : '',
        slug: req.body.slug,
        sort: req.body.sort ? req.body.sort : 500,
      };
      const categoryCreate = await Category.create(data);
      res.status(200).json({
        message: 'succes',
        data: categoryCreate,
      });
    } catch (error) {
      // console.log(error);
    }
  }
}

export default new Controller();
