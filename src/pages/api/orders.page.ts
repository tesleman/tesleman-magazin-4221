import OrdersController from './controller/OrdersController';

import connect from './core/connect';

const order = connect();

order.post(OrdersController.PostOrder);

export default order;
