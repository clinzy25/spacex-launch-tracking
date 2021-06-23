const http = require('http');
const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 3001;
const server = http.createServer(app);

/**
 * Wait for habitablePlantets to populate before listening
 */
async function startServer() {
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();