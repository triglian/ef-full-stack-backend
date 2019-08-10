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

// Routes
app.use('/api', authRoute);
app.use('/api', imagesRoute);

// eslint-disable-next-line no-console
app.listen(8080, () => console.log('Server up and running at http://localhost:8080'));
