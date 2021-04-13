import React from 'react';
import { Container } from '@material-ui/core';
import { BlogItem } from '../../components/Blog';
import { Layuot } from '../shop/shop.import-export';
import Blogs from '../api/models/blogScema';

const Blog = ({ blogs }) => {
  return (
    <Layuot categor="Blog" baseCategory={{ category: 'Blog', link: '/blog' }}>
      <Container>
        {blogs.map((element, index) => (
          <BlogItem key={element._id} cards={element} index={index} />
        ))}
      </Container>
    </Layuot>
  );
};

export default Blog;

export async function getServerSideProps() {
  const blogs = await Blogs.find().limit(3);

  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blogs)),
    },
  };
}
