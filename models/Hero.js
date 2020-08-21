const mongoose = require('mongoose');
// const { random } = require("../iheroes_react/src/components/Battle/Match");

const HeroSchema = new mongoose.Schema({
  id: { type: String },
  picture: { type: String },
  name: { type: String, required: true },
  rank: { type: String },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('heroes', HeroSchema);
