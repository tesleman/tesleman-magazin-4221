import { NextApiRequest, NextApiResponse } from 'next';
import MenueController from './controller/MenueController';
import connect from './core/connect';
import Menue from './models/menueScema';

const menues = connect();

menues.post(MenueController.postMenue);

menues.get(MenueController.getMenue);

export default menues;
