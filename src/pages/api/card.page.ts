import connect from './core/connect';
import CardController from './controller/CardController';
import { passport } from './core/passport';

const apiRoute = connect();

apiRoute.post(passport.authenticate('jwt', { session: false }), CardController.postCard);
apiRoute.patch(passport.authenticate('jwt', { session: false }), CardController.updateCard);

apiRoute.get(CardController.getCatrd);

export default apiRoute;
export const config = {
  api: {
    bodyParser: true, // Disallow body parsing, consume as stream
  },
};
