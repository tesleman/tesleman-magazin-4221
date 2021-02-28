import { model, Schema, Document, models } from 'mongoose';

export interface CardScemaInterface extends Document<any> {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  images?: Array<string>;
}

const CardScema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    slug: {
      type: String,
      required: [true, 'Please add a slug'],
      unique: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
    },
    category: {
      type: String,
      required: true,
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

export const Card = models.Card || model<CardScemaInterface | any>('Card', CardScema);
