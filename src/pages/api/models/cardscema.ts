import { model, Schema, Document, models } from 'mongoose';
interface CardScemaInterface {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  images?: Array<string>;
}

export type sadf = CardScemaInterface & Document;
const CardScema = new Schema<any>(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
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

export const Card = models.Card || model<any>('Card', CardScema);
