const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  picsumId: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  width: {
    type: Number,
    require: true,
  },
  height: {
    type: Number,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  download_url: {
    type: String,
    require: true,
  },
  thumbnail_url: {
    type: String,
    require: true,
  },
  thumbnail_2x_url: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('Image', ImageSchema);
