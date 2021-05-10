import { model, Schema, Document, models, Model } from 'mongoose';

export interface CardScemaInterface {
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
  categoryId: string;
  sale: boolean;
  seo: {
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
  };
}
export interface cardExtendsInterfaceDocument extends Document {}

interface CardScemaInterfaceExtendsInterfaceDocument
  extends CardScemaInterface,
    cardExtendsInterfaceDocument {
  _id: string;
}

export interface ContactModel extends Model<CardScemaInterfaceExtendsInterfaceDocument> {}
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
    categoryId: {
      type: String,
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
const Card: ContactModel =
  models.Card || model<CardScemaInterfaceExtendsInterfaceDocument>('Card', CardScema);

export default Card;
