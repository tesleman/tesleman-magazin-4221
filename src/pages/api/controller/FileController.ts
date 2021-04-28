import { NextApiRequest, NextApiResponse } from 'next';
interface NextApiRequestExtand extends NextApiRequest {
  files: Array<Express.Multer.File>;
}
class FileController {
  async FilePost(req: NextApiRequestExtand, res: NextApiResponse) {
    const file = req.files;

    if (!file) {
      const error = new Error('Please choose files');
    }

    let fileNames = file.map((element) => '/uploads/' + element.filename);

    res.send(fileNames);
  }
}

export default new FileController();
