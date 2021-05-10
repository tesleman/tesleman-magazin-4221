import { model, Schema, Document, models, Model } from 'mongoose';

export interface CategoryBaseDocument extends Document {
  _id: string;
  title: string;
  meta: string;
  slug: string;
  sort: number;
  seo: {
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
  };
}

const CategoryScema = new Schema(
  {
    title: {
      type: String,
      maxlength: [20, 'Title cannot be more than 20 characters'],
    },

    slug: {
      type: String,
      require: [true, 'nead  slug'],
      unique: [true, 'nead uniqe slug'],
      maxlength: [20, 'Title cannot be more than 20 characters'],
    },
    sort: {
      type: Number,
    },
    seo: {
      meta_title: {
        type: String,
      },
      meta_keywords: {
        type: String,
      },
      meta_description: {
        type: String,
      },
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
