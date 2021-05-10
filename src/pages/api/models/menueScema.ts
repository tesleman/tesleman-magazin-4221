import { model, Schema, Document, models, Model } from 'mongoose';

export interface MenueScemaInterface extends Document {
  _id: string;
  subcat?: Array<string>;
  title: string;
  slug: string;
  active: true;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  sort: number;
  seo: {
    meta_title: string;
    meta_keywords: string;
    meta_description: string;
  };
}

const MenueScema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      maxlength: [20, 'Title cannot be more than 20 characters'],
    },
    slug: {
      type: String,
      unique: true,
      required: [true, 'Please add a slug'],
    },
    active: {
      type: Boolean,
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
    subcat: [
      {
        type: [Schema.Types.ObjectId],
        ref: 'Submenue',
      },
    ],
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: true,
  },
);

const Menue: Model<MenueScemaInterface> =
  models.Menue || model<MenueScemaInterface>('Menue', MenueScema);

export default Menue;
