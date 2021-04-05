import { model, Schema, Document, models, Model } from 'mongoose';

export interface CategoryBaseDocument extends Document {
  _id: string;
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
    sort: {
      type: Number,
    },
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: true,
  },
);

const Category: Model<CategoryBaseDocument> =
  models.Category || model<CategoryBaseDocument>('Category', CategoryScema);
export default Category;
