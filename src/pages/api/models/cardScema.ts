import { model, Schema, Document, models } from 'mongoose';

export interface CardScemaInterface {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  images?: Array<string>;
  price: number;
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
      unique: [true, 'Please add unique slug'],
    },
    subtitle: {
      type: String,
      required: true,
    },
    prise: {
      type: Number,
      required: [true, 'Please add a prise'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    detail: {
      type: String,
    },
    category: {
      type: String,
      required: [true, 'Please choise category'],
    },
    categoryslug: {
      type: String,
      required: [true, 'Please choise category'],
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
