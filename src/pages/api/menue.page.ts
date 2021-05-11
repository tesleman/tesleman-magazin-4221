import MenueController from './controller/MenueController';
import connect from './core/connect';

const menues = connect();

menues.post(MenueController.postMenue);

menues.get(MenueController.getMenue);

export default menues;
