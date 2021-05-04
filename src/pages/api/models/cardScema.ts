import { model, Schema, Document, models, Model } from 'mongoose';

export interface CardScemaInterface extends Document {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  images?: Array<string>;
  price: number;
  artikul: string;
  slug: string;
  detail?: string;
  categoryslug: string;
  sale: boolean;
}

export interface ContactModel extends Model<CardScemaInterface> {}
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
    price: {
      type: Number,
      required: [true, 'Please add a price'],
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
    artikul: {
      type: String,
    },
    sale: {
      type: Boolean,
      default: false,
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
CardScema.index({ '$**': 'text' });
const Card: ContactModel = models.Card || model<CardScemaInterface>('Card', CardScema);

export default Card;
