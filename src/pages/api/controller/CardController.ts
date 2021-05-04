import { NextApiRequest, NextApiResponse } from 'next';
import Card from '../models/cardScema';
class CardController {
  async postCard(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const cardSpred = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        category: req.body.category,
        images: req.body.images || [],
        slug: req.body.slug,
        artikul: req.body.artikul,
        detail: req.body.detail,
        categoryslug: req.body.categoryslug,
        price: req.body.price || 0,
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
      res.status(400);
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
        category: req.query.category ? { category: req.query.category.toString() } : {},
      };
      const numberOfCards = await Card.find(pageOptions.category).countDocuments();
      let card = await Card.find(pageOptions.category)
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
      const {
        slug,
        title,
        category,
        categoryslug,
        price,
        detail,
        artikul,
        description,
        subtitle,
        images,
      } = req.body;

      const updateCardBiId = await Card.findByIdAndUpdate(
        cardId,
        {
          slug,
          title,
          category,
          categoryslug,
          price,
          detail,
          artikul,
          description,
          subtitle,
          images,
        },
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
