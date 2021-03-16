import { model, Schema, Document, models } from 'mongoose';

export interface SubcatScemaInterface extends Document<any> {
  title: string;
  meta: string;
  slug: string;
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

export const Subcat = models.Subcat || model<SubcatScemaInterface | any>('Subcat', SubcatScema);
