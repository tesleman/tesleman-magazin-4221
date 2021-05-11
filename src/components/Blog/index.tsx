import { Container, Grid, Button } from '@material-ui/core';
import React from 'react';
import Image from 'next/image';

import { useStyles, useStylesType } from './blog.style';

import Link from 'next/link';
import { BlogScemaInterface } from '../../pages/api/models/blogScema';

const Blog: React.FC<{ blogs: Array<BlogScemaInterface> }> = ({ blogs }) => {
  const style: useStylesType = useStyles();
  return (
    <div className={style.rootroot}>
      <Container>
        {blogs.map((item: BlogScemaInterface, index: number) => (
          <BlogItem key={item._id} blog={item} index={index} />
        ))}
      </Container>
    </div>
  );
};

export default Blog;

export const BlogItem: React.FC<{ blog: BlogScemaInterface; index: number }> = ({
  blog,
  index,
}) => {
  const style: useStylesType = useStyles();
  return (
    <Grid
      style={
        index == 0 || Math.floor(index / 2)
          ? { transform: 'translateX(-1%)' }
          : { transform: 'translateX(1%)' }
      }
      container
      alignItems="center"
      direction={index == 0 || Math.floor(index / 2) ? 'row-reverse' : 'row'}
    >
      <Grid className={style.root} item md={4} xs={12}>
        <Image
          src={blog.images.length > 0 ? blog.images[0] : '/img_no_found.jpg'}
          alt="Picture of the author"
          width={480}
          height={350}
          layout="responsive"
        />

        <span className={style.span}></span>
      </Grid>
      <Grid
        style={
          index == 0 || Math.floor(index / 2)
            ? { transform: 'translateX(5%)' }
            : { transform: 'translateX(-5%)' }
        }
        className={style.postAnons}
        item
        md={8}
        xs={12}
      >
        <h3>Summer is Calling: Sophie Hulme Citrus Fruit Tote</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada malesuada
          feugiat. Aenean magna enim, scelerisque quis augue vulputate, accumsan pharetra diam. Sed
          vehicula nibh quis mi venenatis scelerisque. Nullam...
        </p>
        <Link href={`/blog/${blog._id}`}>
          <a>
            <Button color="default" className={style.button}>
              More...
            </Button>
          </a>
        </Link>
      </Grid>
    </Grid>
  );
};
