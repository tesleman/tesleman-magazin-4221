import { NextApiRequest, NextApiResponse } from 'next';
import connect from './core/connect';
import { upload } from './core/multer';

const apiRoute = connect();
apiRoute.use(upload.array('avatar', 12));
interface NextApiRequestExtand extends NextApiRequest {
  files: Array<Express.Multer.File>;
}
apiRoute.post((req: NextApiRequestExtand, res: NextApiResponse) => {
  const file = req.files;
  console.log(file);
  if (!file) {
    const error = new Error('Please choose files');
  }

  let fileNames = file.map((element) => '/uploads/' + element.filename);

  res.send(fileNames);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
