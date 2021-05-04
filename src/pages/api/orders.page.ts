import OrdersController from './controller/OrdersController';

import connect from './core/connect';
import { passport } from './core/passport';

const order = connect();

order.post(OrdersController.PostOrder);
order.patch(passport.authenticate('jwt', { session: false }), OrdersController.UpdateOrder);
export default order;
