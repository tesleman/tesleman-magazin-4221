import { model, Schema, Document, models } from 'mongoose';

export interface SubcatScemaInterface extends Document<any> {
  _id: string;
  title: string;
  slug: string;
  seo: {
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
  };
}

const SubcatScema = new Schema(
  {
    title: {
      type: String,
      maxlength: [20, 'Title cannot be more than 20 characters'],
    },
    slug: {
      type: String,
      unique: [true, 'nead unique slug'],
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

export const Subcat = models.Submenue || model<SubcatScemaInterface | any>('Submenue', SubcatScema);
