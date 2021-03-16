import mongoose from 'mongoose';

mongoose.Promise = Promise;

const connect = mongoose.connect(`mongodb://${process.env.domein}:27017/test`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

async function dbConnect() {
  if (db) {
    return;
  } else {
    connect;
    db.on('error', console.error.bind(console, 'conneCTION ERROR'));
  }
}

export default dbConnect;
