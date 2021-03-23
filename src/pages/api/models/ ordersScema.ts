import { model, Schema, Document, models, Model } from 'mongoose';

export interface OrderScemaInterface extends Document {
  title: string;
  subtitle: string;
  description: string;
  category: string;
  images?: Array<string>;
  price: number;
}

const OrderScema = new Schema(
  {
    person: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },
    order:[ {
      title: {
        type: String,
      },
      price: {
        type: String,
      },

      count: {
        type: String,
      },
      totalPrice: {
        type: String,
      },
      artikul: {
        type: String,
      },}
    ,]
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: true,
  },
);

const Order: Model<OrderScemaInterface> =
  models.Order || model<OrderScemaInterface>('Order', OrderScema);
export default Order;
