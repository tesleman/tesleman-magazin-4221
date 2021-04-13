import { NextApiRequest, NextApiResponse } from 'next';
import connect from './core/connect';
import Blog from './models/blogScema';

const hendler = connect();

hendler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const blogPayloadReqestBodyData = {
      title: req.body.title,
      body: req.body.body,
      active: req.body.active || true,
      images: req.body.images || '/img_no_found.jpg',
    };

    const blogPost = await Blog.create(blogPayloadReqestBodyData);
    res.status(200).json({
      message: 'succes',
      data: blogPost,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
});

export default hendler;
