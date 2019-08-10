const router = require('express').Router();
const axios = require('axios');
const verifyToken = require('../middleware/verifyToken');

router.get('/list', verifyToken, async (req, res, next) => {
  try {
    const response = await axios.get(process.env.PISCUM_API);
    return res.json(response.data);
  } catch (err) {
    if (err.response) {
      return res.status(err.response.status).json({err: true, message: err.response.statusText});
    }

    if (err.request) {
      return res.status(500).json({err: true, message: 'Error while requesting Piscum API'});
    }

    return next(err);
  }
});

module.exports = router;
