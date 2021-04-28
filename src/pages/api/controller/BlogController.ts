import { NextApiRequest, NextApiResponse } from 'next';
import Blog from '../models/blogScema';

class BlogController {
  async PostBlog(req: NextApiRequest, res: NextApiResponse) {
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
  }
}

export default new BlogController();
