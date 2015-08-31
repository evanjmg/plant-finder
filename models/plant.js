var mongoose = require('mongoose');

var Plant = mongoose.schema({
  name: String,
  scientific_name: String,
  family: String,
  description: String
});

module.exports = mongoose.model(Plant);
