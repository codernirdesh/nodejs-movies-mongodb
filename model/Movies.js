const mongoose = require("mongoose");
const movie_schema = new mongoose.Schema({
  title: {
    type: String,
    max: 255,
    required: true,
  },
  imageUrl: {
    type: String,
    max: 255,
    required: true,
  },
  description: {
    type: String,
    max: 255,
    required: true,
  },
  rating: {
    type: String,
    max: 255,
    required: true,
  },
  year: {
    type: String,
    max: 255,
    required: true,
  },
  downloadLink: {
    type: String,
    max: 255,
    required: true,
  },
  category: {
    type: Array,
    required: true,
  },
  trailerYoutubeLink: {
    type: String,
    max: 255,
    required: true,
  },
});

module.exports = mongoose.model("Movies", movie_schema);
