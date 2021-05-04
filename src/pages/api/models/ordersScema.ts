import { model, Schema, Document, models, Model, ObjectId } from 'mongoose';

export interface OrderScemaInterface extends Document {
  _id: string;
  person: {
    name: string;
    email: string;
    phone: string;
  };
  order: [
    {
      status: string;
      title: string;
      price: string;
      count: string;
      totalPrice: string;
      artikul: string;
      _id: string;
    },
  ];
  status: string;
}

const OrderScema = new Schema(
  {
    status: {
      type: String,
    },
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
    order: [
      {
        status: {
          type: String,
        },
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
        },
      },
    ],
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: true,
  },
);

const Order: Model<OrderScemaInterface> =
  models.Order || model<OrderScemaInterface>('Order', OrderScema);
export default Order;
