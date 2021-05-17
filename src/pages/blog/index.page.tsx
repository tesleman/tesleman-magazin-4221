import React from 'react';
import { Container } from '@material-ui/core';
import { BlogItem } from '../../components/Blog';
import { Layuot } from '../shop/shop.import-export';
import Blogs, { BlogScemaInterface } from '../api/models/blogScema';
import Head from 'next/head';

export async function getServerSideProps() {
  const blogs = await Blogs.find().limit(3);

  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blogs)),
    },
  };
}

const Blog: React.FC<{ blogs: Array<BlogScemaInterface> }> = ({ blogs }) => {
  return (
    <Layuot category="Blog" baseCategory={{ category: 'Blog', link: '/blog' }}>
      <>
        <Head>
          <title>Blog</title>.
          <meta name="description" content="" />
          <meta name="keywords" content="" />
        </Head>
        <Container>
          {blogs.map((element, index) => (
            <BlogItem key={element._id} blog={element} index={index} />
          ))}
        </Container>
      </>
    </Layuot>
  );
};

export default Blog;
