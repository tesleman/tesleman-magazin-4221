import FileController from './controller/FileController';
import connect from './core/connect';
import { upload } from './core/multer';

const apiRoute = connect();
apiRoute.use(upload.array('avatar', 12));

apiRoute.post(FileController.FilePost);

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
