import { model, Schema, Document, models, ObjectId } from 'mongoose';

export interface UserScemaInterface extends Document<any> {
  _id: ObjectId;
  user: string;
  password: string;
}

const UserScema = new Schema({
  user: {
    type: String,
  },
  password: {
    type: String,
  },
});

export const User = models.User || model<UserScemaInterface | any>('User', UserScema);
