const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const MONGO_URL =
  'mongodb+srv://kepler-api:nrqg5O1aCXLsCKsS@kepler-launch.wyyd8.mongodb.net/kepler-launch?retryWrites=true&w=majority';

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);


mongoose.connection.once('open', () => {
  console.log('MongoDB connected')
})

mongoose.connection.on('error', (err) => {
  console.error(err)
})

/** Wait for habitablePlantets to populate before listening */
async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
