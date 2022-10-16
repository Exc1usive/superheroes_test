const mongoose = require("mongoose");

const superheroSchema = new mongoose.Schema({
  nickname: { type: String, requred: true },
  real_name: { type: String },
  origin_description: { type: String },
  superpowers: { type: String },
  catch_phrase: { type: String },
  images: [{ type: String }],
});

const Superhero = mongoose.model("Superhero", superheroSchema);

module.exports = Superhero;
