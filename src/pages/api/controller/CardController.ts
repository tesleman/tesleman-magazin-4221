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
        images: req.body.images,
        slug: req.body.slug,
        artikul: req.body.artikul,
        detail: req.body.detail,
        categoryslug: req.body.categoryslug,
        price: req.body.price,
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
      const images = req.body.images;
      const sale = req.body.sale;

      const updateCardBiId = await Card.findByIdAndUpdate(cardId, { images, sale }, { new: true });
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
