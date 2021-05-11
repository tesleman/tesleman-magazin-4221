import React from 'react';
import Blog, { BlogScemaInterface } from '../api/models/blogScema';
import Image from 'next/image';
import { Container, Grid } from '@material-ui/core';
import { useStyles } from './blog.style';
import dbConnect from '../api/core/db';
import { useRouter } from 'next/router';
import Head from 'next/head';

const BlogItem: React.FC<{ blog: BlogScemaInterface }> = ({ blog }) => {
  const style = useStyles();
  const router = useRouter();
  if (router.isFallback) return <div>...loading</div>;

  return (
    <Container className={style.root}>
      <Head>
        <title>{blog.title}</title>.
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Head>
      <Grid container alignItems="center" direction="column">
        <Grid style={{ height: 450 }} item xs={12}>
          <Image src={blog.images[0]} alt="Picture of the author" width={480} height={350} />
        </Grid>
        <Grid item xs={12}>
          {blog.body}
        </Grid>
      </Grid>
    </Container>
  );
};

export default BlogItem;

export async function getStaticProps({ params }) {
  dbConnect();
  const blogItem = await Blog.findById(params.id).exec();

  return {
    props: {
      blog: JSON.parse(JSON.stringify(blogItem)),
    },
  };
}

export async function getStaticPaths() {
  dbConnect();
  const blogItem = await Blog.find().exec();
  const paths = blogItem.map((elem) => {
    return { params: { id: elem._id.toString() } };
  });

  return {
    fallback: false,
    paths,
  };
}
