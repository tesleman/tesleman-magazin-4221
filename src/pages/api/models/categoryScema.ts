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

      maxlength: [20, 'Title cannot be more than 20 characters'],
    },

    slug: {
      type: String,
      require: true,
      unique: [true, 'nead uniqe slug'],
      maxlength: [20, 'Title cannot be more than 20 characters'],
    },
    meta: {
      type: String,
      maxLenght: [40, 'Title cannot be more than 40 characters'],
    },
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: true,
  },
);

export const Category =
  models.Category || model<CategoryScemaInterface | any>('Category', CategoryScema);
