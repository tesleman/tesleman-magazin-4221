import connect from './core/connect';
import CardController from './controller/CardController';

const apiRoute = connect();

apiRoute.post(CardController.postCard);

apiRoute.get(CardController.getCatrd);

apiRoute.patch(CardController.updateCard);

export default apiRoute;
export const config = {
  api: {
    bodyParser: true, // Disallow body parsing, consume as stream
  },
};
