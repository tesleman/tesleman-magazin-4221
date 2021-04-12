import mongoose from 'mongoose';

mongoose.Promise = Promise;

const db = mongoose.connection;

async function dbConnect() {
  try {
    if (db.readyState >= 1) {
      return;
    }

    db.on('error', console.error.bind(console, 'conneCTION ERROR'));
    return await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.log(error, 'error');
  }
}

export default dbConnect;

//readyState states: [Object: null prototype] {
//   '0': 'disconnected',
//   '1': 'connected',
//   '2': 'connecting',
//   '3': 'disconnecting',
//   '99': 'uninitialized',
//   disconnected: 0,
//   connected: 1,
//   connecting: 2,
//   disconnecting: 3,
//   uninitialized: 99
