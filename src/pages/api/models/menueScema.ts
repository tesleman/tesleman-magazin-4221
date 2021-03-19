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
    subcat: [
      {
        type: [Schema.Types.ObjectId],
        ref: 'Category' || 'Subcat',
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
