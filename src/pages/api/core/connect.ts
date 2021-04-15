import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import dbConnect from './db';
import cors from 'cors';
export default function connect() {
  return nextConnect({
    onError(error, req: NextApiRequest, res: NextApiResponse) {
      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  })
    .use((req, res, next) => {
      dbConnect();
      next();
    })
    .use((req, res, next) => {
      cors({
        origin: true,
        credentials: true,
      });
      next();
    });
}
