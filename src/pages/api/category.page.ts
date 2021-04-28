import connect from './core/connect';

import Controller from './controller/CategoryController';

const category = connect();

category.post(Controller.postCat);

category.get(Controller.getCat);

export default category;
