const router = require('express').Router();
const axios = require('axios');
const verifyToken = require('../middleware/verifyToken');
const Image = require('../model/Image');

const port = process.env.PORT || 8080;
const rootUrl = `http://localhost:${port}/`;

router.get('/list', verifyToken, async (req, res, next) => {
  try {
    const images = await Image.find({}, {_id: 0, __v: 0}).lean();
    const imagesWithRootUrl = images.map(image => ({
      ...image,
      download_url: `${rootUrl}${image.download_url}`,
      thumbnail_url: `${rootUrl}${image.thumbnail_url}`,
      thumbnail_2x_url: `${rootUrl}${image.thumbnail_2x_url}`,
    }));

    return res.json(imagesWithRootUrl);
  } catch (err) {
    return next(err);
  }
});

// original picusm api wrapper
router.get('/listPicsum', verifyToken, async (req, res, next) => {
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
