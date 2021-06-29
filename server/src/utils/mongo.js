const mongoose = require('mongoose');

const MONGO_URL =
  'mongodb+srv://kepler-api:nrqg5O1aCXLsCKsS@kepler-launch.wyyd8.mongodb.net/kepler-launch?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
