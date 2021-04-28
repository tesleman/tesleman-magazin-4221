import BlogController from './controller/BlogController';
import connect from './core/connect';

const hendler = connect();

hendler.post(BlogController.PostBlog);

export default hendler;
