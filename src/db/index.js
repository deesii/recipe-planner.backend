const mongoose = require('mongoose');

const databaseDomain = process.env.MONGO_URL || 'localhost:27017';
const databaseName = 'test';

const mongoDBUri = `mongodb://${databaseDomain}/${databaseName}`;

const connectDB = () => {
  const db = mongoose.connection;

  // Bind connection to error event (to get notification of connection errors)
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  // Bind connection to open event (to get notification when the connection is successful)
  db.once('open', () => console.log('Successfully connected to MongoDB!'));

  mongoose.connect(mongoDBUri);
};

module.exports = connectDB;
