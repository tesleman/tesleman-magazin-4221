import { model, Schema, Document, models, Model } from 'mongoose';

export interface BlogScemaInterface extends Document {
  _id: string;
  title: string;
  active: true;
  createdAt: Date;
  updatedAt: Date;
  body: string;
  images: string[];
  __v: number;
}

const BlogScema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      maxlength: [20, 'Title cannot be more than 20 characters'],
    },

    body: {
      type: String,
    },

    active: {
      type: Boolean,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: true,
  },
);

const Blog: Model<BlogScemaInterface> = models.Blog || model<BlogScemaInterface>('Blog', BlogScema);

export default Blog;
