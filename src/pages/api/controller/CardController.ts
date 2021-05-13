import { NextApiRequest, NextApiResponse } from 'next';
import Card from '../models/cardScema';
import Category from '../models/categoryScema';
class CardController {
  async postCard(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const category = await Category.findOne({ slug: req.body.categoryslug });
      const cardSpred = {
        active: req.body.active || true,
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        category: req.body.category || category.title,
        images: req.body.images || [],
        slug: req.body.slug,
        artikul: req.body.artikul,
        detail: req.body.detail,
        categoryslug: req.body.categoryslug,
        price: req.body.price || 0,
        categoryId: category._id,
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

      const card = await Card.create(cardSpred);

      res.status(200).json({
        message: 'succes',
        data: card,
      });
    } catch (e) {
      res.status(400).json({
        message: e,
      });
    }
  }
  async getCatrd(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      /// api/card?page=0&limit=2

      const pageOptions = {
        page: parseInt(req.query.page as string, 10) || 0,
        limit: parseInt(req.query.limit as string, 10) || 10,
        categoryId: req.query.categoryId ? { categoryId: req.query.categoryId.toString() } : {},
      };
      const numberOfCards = await Card.find({
        $and: [pageOptions.categoryId, { active: true }],
      }).countDocuments();
      let card = await Card.find({
        $and: [pageOptions.categoryId, { active: true }],
      })
        .skip(pageOptions.page * pageOptions.limit)
        .limit(pageOptions.limit);

      res.status(200).json({
        message: 'succes',
        pageLenght: card.length,
        totalCount: numberOfCards,
        data: card,
      });
    } catch (e) {
      res.status(400).json({
        message: e,
      });
    }
  }
  async updateCard(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const cardId = req.body._id;
      const card = await Card.findById({ _id: req.body._id });

      const cardUpdate = {
        active: req.body.active,
        slug: req.body.slug || card.slug,
        title: req.body.title || card.title,
        category: req.body.category || card.category,
        categoryslug: req.body.categoryslug || card.categoryslug,
        price: req.body.price || card.price,
        detail: req.body.detail || card.detail,
        artikul: req.body.artikul || card.artikul,
        description: req.body.description || card.description,
        subtitle: req.body.subtitle || card.subtitle,
        images: req.body.images || card.images,
        seo: {
          meta_title: req.body.meta_title || card.seo.meta_title,
          meta_keywords: req.body.meta_keywords || card.seo.meta_keywords,
          meta_description: req.body.meta_description || card.seo.meta_description,
        },
      };

      const updateCardBiId = await Card.findByIdAndUpdate(
        { _id: cardId },
        { ...cardUpdate },
        { new: true },
      );

      res.status(200).json({
        message: 'succes',
        data: updateCardBiId,
      });
    } catch (error) {
      res.status(400).json({
        message: error,
      });
    }
  }
}

export default new CardController();
