import mongoose from 'mongoose';

const connectToDB = () => {
  const url = process.env.MONGO_DB_CONNECTION_STRING;

  const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connect
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectToDB;
