import { model, Schema, Document, models } from 'mongoose';

export interface MenueScemaInterface extends Document<any> {
  title: string;
  meta: string;
  slug: string;
  active: boolean;
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

export const Menue = models.Menue || model<MenueScemaInterface | any>('Menue', MenueScema);
