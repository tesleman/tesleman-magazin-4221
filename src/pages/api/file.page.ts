import nextConnect from 'next-connect';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req: NextApiRequest, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/uploads',
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

apiRoute.use(upload.array('avatar', 12));
interface NextApiRequestExtand extends NextApiRequest {
  files: File;
}
apiRoute.post((req: NextApiRequestExtand, res: NextApiResponse) => {
  const file = req.files;
  console.log(file, req.body);
  if (!file) {
    const error = new Error('Please choose files');
  }

  res.send(file);
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
