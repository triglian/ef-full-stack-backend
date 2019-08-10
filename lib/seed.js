require('dotenv').config();
const mongoose = require('mongoose');
const data = require('../data/image-data');
const Image = require('../model/Image');

mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, async () => {
  // eslint-disable-next-line no-console
  console.log('Connected to mongo cluster db');
  try {
    await Image.deleteMany();
    await Image.insertMany(data);
    console.log('Image data successfully seeded.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
