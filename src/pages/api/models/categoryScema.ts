import { model, Schema, Document, models } from 'mongoose';

export interface CategoryScemaInterface extends Document<any> {
  title: string;
  meta: string;
  slug: string;
}

const CategoryScema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      unique: true,
      maxlength: [20, 'Title cannot be more than 20 characters'],
    },
    meta: {
      type: String,
      maxLenght: [40, 'Title cannot be more than 40 characters'],
    },
    slug: {
      type: String,
      unique: true,
      required: [true, 'Please add a slug'],
    },
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: true,
  },
);

export const Category =
  models.Category || model<CategoryScemaInterface | any>('Category', CategoryScema);
