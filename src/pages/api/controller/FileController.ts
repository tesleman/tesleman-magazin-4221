import { NextApiRequest, NextApiResponse } from 'next';
interface NextApiRequestExtand extends NextApiRequest {
  files: Array<Express.Multer.File>;
}
class FileController {
  async FilePost(req: NextApiRequestExtand, res: NextApiResponse) {
    try {
      const file = req.files;

      if (!file) {
        const error = new Error('Please choose files');
      }

      let fileNames = file.map((element) => '/uploads/' + element.filename);

      res.status(200).json({
        images: fileNames,
        message: 'succes',
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FileController();
