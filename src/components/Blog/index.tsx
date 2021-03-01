import { Container, Grid, Button } from '@material-ui/core';
import React from 'react';
import Image from 'next/image';

import { useStyles } from './blog.style';

const Blog = ({ cards }) => {
  const style = useStyles();
  return (
    <div>
      <Container>
        {cards.map((item, index) => (
          <BlogItem style={style} cards={item} index={index} />
        ))}
      </Container>
    </div>
  );
};

export default Blog;

const BlogItem = ({ style, cards, index }) => {
  return (
    <Grid
      style={
        index == 0 || Math.floor(index / 2)
          ? { transform: 'translateX(-1%)' }
          : { transform: 'translateX(1%)' }
      }
      container
      direction={index == 0 || Math.floor(index / 2) ? 'row-reverse' : 'row'}>
      <Grid className={style.root} item xs={4}>
        <Image
          src={cards.images[0]}
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
        xs={8}>
        <h3>Summer is Calling: Sophie Hulme Citrus Fruit Tote</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi malesuada malesuada
          feugiat. Aenean magna enim, scelerisque quis augue vulputate, accumsan pharetra diam. Sed
          vehicula nibh quis mi venenatis scelerisque. Nullam...
        </p>
        <Button color="default" className={style.button}>
          More...
        </Button>
      </Grid>
    </Grid>
  );
};
