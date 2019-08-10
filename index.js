require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const cors = require('./middleware/cors');
const authRoute = require('./routes/auth');
const imagesRoute = require('./routes/images');

const app = express();
mongoose.connect(
  process.env.DB_CONNECT,
  {useNewUrlParser: true},
  // eslint-disable-next-line no-console
  () => console.log('Connected to mongo cluster db')
);

// Middleware
app.use(express.json());
app.use(cors);

// Static files (images)
app.use(express.static('public'));

// Routes
app.use('/api', authRoute);
app.use('/api', imagesRoute);

const port = process.env.PORT || 8080;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Server up and running at http://localhost:${port}`));
