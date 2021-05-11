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
        slug: req.body.slug,
        sort: req.body.sort ? req.body.sort : 500,
        active: req.body.active || true,
        seo: {
          meta_title: req.body.meta_title || `${req.body.title}, купить в интернет-магазине `,
          meta_keywords:
            req.body.meta_keywords ||
            `${req.body.title}, купить ${req.body.title}, приобрести ${req.body.title}, ${req.body.title} в различных цветах, ${req.body.title} от дистрибьютора`,
          meta_description:
            req.body.meta_description ||
            `${req.body.title}  вы можете купить в нашем магазине "название магазина"`,
        },
      };
      const categoryCreate = await Category.create(data);
      res.status(200).json({
        message: 'succes',
        data: categoryCreate,
      });
    } catch (error) {
      res.status(301).json({
        message: 'faild',
        error: error,
      });
    }
  }

  async updateCat(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const category = await Category.findOne({ slug: req.body.slug });

    const data = {
      active: req.body.active || category.active,
      title: req.body.title || category.title,
      slug: req.body.slug || category.slug,
      sort: req.body.sort || category.sort,
      seo: {
        meta_title: req.body.meta_title || category.seo.meta_title,
        meta_keywords: req.body.meta_keywords || category.seo.meta_keywords,
        meta_description: req.body.meta_description || category.seo.meta_description,
      },
    };

    const categoryUpdate = await Category.findByIdAndUpdate(
      { _id: category._id },
      { ...data },
      { new: true },
    );
    const respCategUpdeted = await Category.findById({ _id: categoryUpdate._id });

    res.status(200).json({
      message: 'succes',
      data: respCategUpdeted,
    });
  }
}

export default new Controller();
