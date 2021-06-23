const { launches } = require('../../models/launches.model');

function getAllLaunches(req, res) {
  for (value of launches.values())
  return res.status(200).json(Array.from(launches.values()));
}

module.exports = {
  getAllLaunches,
};
